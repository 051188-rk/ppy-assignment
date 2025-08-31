"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import dynamic from 'next/dynamic';
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import TimeFilterBar from "./components/TimeFilterBar";
import StatCard from "./components/StatCard";
import PdfExport from "./components/PdfExport";
import ReportModal from "./components/ReportModal";
import ChartSkeleton from "./components/ChartSkeleton";
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// Dynamically import charts with no SSR
const ClientsBubbleChart = dynamic(
  () => import('./components/ClientsBubbleChart'),
  { ssr: false, loading: () => <ChartSkeleton /> }
);

const SipBusinessChart = dynamic(
  () => import('./components/SipBusinessChart'),
  { ssr: false, loading: () => <ChartSkeleton /> }
);

const MonthlyMisChart = dynamic(
  () => import('./components/MonthlyMisChart'),
  { ssr: false, loading: () => <ChartSkeleton /> }
);

async function getJSON(path) {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed fetch " + path);
  return res.json();
}

export default function Page() {
  const [range, setRange] = useState("3d");
  const [loadingTop, setLoadingTop] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingCharts, setLoadingCharts] = useState(true);

  const [aum, setAum] = useState(null);
  const [sip, setSip] = useState(null);
  const [stats, setStats] = useState(null);
  const [sipBiz, setSipBiz] = useState(null);
  const [mis, setMis] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const dashboardRef = useRef(null);
  const aumCardRef = useRef(null);
  const sipCardRef = useRef(null);
  const clientsChartRef = useRef(null);
  const sipBusinessChartRef = useRef(null);
  const monthlyMisChartRef = useRef(null);

  const loadAll = async (r) => {
    setLoadingTop(true);
    setLoadingStats(true);
    setLoadingCharts(true);

    try {
      const [aumRes, sipRes, statsRes, sipBizRes, misRes] = await Promise.all([
        getJSON(`/api/aum?range=${r}`),
        getJSON(`/api/sip?range=${r}`),
        getJSON(`/api/stats?range=${r}`),
        getJSON(`/api/sip-business?range=${r}`),
        getJSON(`/api/monthly-mis?range=${r}`),
      ]);
      setAum(aumRes);
      setSip(sipRes);
      setStats(statsRes);
      setSipBiz(sipBizRes);
      setMis(misRes);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoadingTop(false);
      setLoadingStats(false);
      setLoadingCharts(false);
    }
  };

  useEffect(() => {
    loadAll(range);
  }, [range]);

  const exportComponentToPdf = async (ref, title) => {
    if (!ref?.current) return;
    
    try {
      const canvas = await html2canvas(ref.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save(`${title.replace(/\s+/g, '_').toLowerCase()}_${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  const handleDownload = (ref, title) => {
    exportComponentToPdf(ref, title);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="fixed top-4 right-4 z-50">
        <PdfExport dashboardRef={dashboardRef} />
      </div>

      <main ref={dashboardRef} className="mx-auto max-w-7xl px-4 py-6 space-y-6 bg-white dark:bg-gray-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div ref={aumCardRef}>
            <Card
              title="Current"
              action={
                <button 
                  className="btn flex items-center gap-2"
                  onClick={() => openModal('aum')}
                >
                  <Image
                    src="/icons/IcTwotoneRemoveRedEye.svg"
                    alt="View"
                    width={16}
                    height={16}
                    className="invert-0 dark:invert"
                  />
                  View Report
                </button>
              }
            >
              {loadingTop ? (
                <div className="skeleton h-24" />
              ) : (
                <div className="space-y-2">
                  <div className="text-sm opacity-70">AUM</div>
                  <div className="text-3xl font-bold">
                    {aum?.value} <span className="text-base font-medium">Cr</span>
                  </div>
                  <div className="badge">▲ {aum?.mom}% MoM</div>
                </div>
              )}
            </Card>
          </div>

          <div ref={sipCardRef}>
            <Card
              title="Current"
              action={
                <button 
                  className="btn flex items-center gap-2"
                  onClick={() => openModal('sip')}
                >
                  <Image
                    src="/icons/IcTwotoneRemoveRedEye.svg"
                    alt="View"
                    width={16}
                    height={16}
                    className="invert-0 dark:invert"
                  />
                  View Report
                </button>
              }
            >
              {loadingTop ? (
                <div className="skeleton h-24" />
              ) : (
                <div className="space-y-2">
                  <div className="text-sm opacity-70">SIP</div>
                  <div className="text-3xl font-bold">
                    {sip?.value} <span className="text-base font-medium">Lakh</span>
                  </div>
                  <div className="badge">▲ {sip?.mom}% MoM</div>
                </div>
              )}
            </Card>
          </div>
        </div>

        <div className="flex justify-end">
          <TimeFilterBar onChange={setRange} />
        </div>

        <div className="grid md:grid-cols-5 gap-4">
          <StatCard
            loading={loadingStats}
            icon="/pic1.png"
            title="Purchases"
            count={stats?.purchases.count}
            amount={`${stats?.purchases.amount} INR`}
          />
          <StatCard
            loading={loadingStats}
            icon="/pic2.png"
            title="Redemptions"
            count={stats?.redemptions.count}
            amount={`${stats?.redemptions.amount} INR`}
          />
          <StatCard
            loading={loadingStats}
            icon="/pic3.png"
            title="Rej. Transactions"
            count={stats?.rejected.count}
            amount={`${stats?.rejected.amount} INR`}
          />
          <StatCard
            loading={loadingStats}
            icon="/pic4.png"
            title="SIP Rejections"
            count={stats?.sipRej.count}
            amount={`${stats?.sipRej.amount} INR`}
          />
          <StatCard
            loading={loadingStats}
            icon="/pic5.png"
            title="New SIP"
            count={stats?.newSip.count}
            amount={`${stats?.newSip.amount} INR`}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          <div ref={clientsChartRef}>
            <Card
              title="CLIENTS"
              action={
                <button 
                  className="btn flex items-center gap-2"
                  onClick={() => handleDownload(clientsChartRef, 'Clients Report')}
                >
                  <Image
                    src="/icons/IconamoonCloudDownload.svg"
                    alt="Download"
                    width={16}
                    height={16}
                    className="invert-0 dark:invert"
                  />
                  Download Report
                </button>
              }
              className="lg:col-span-1"
            >
              {loadingCharts ? (
                <ChartSkeleton />
              ) : (
                <ClientsBubbleChart data={stats?.clients || {}} loading={loadingCharts} />
              )}
            </Card>
          </div>

          <div ref={sipBusinessChartRef}>
            <Card
              title="SIP BUSINESS CHART"
              action={
                <button 
                  className="btn flex items-center gap-2"
                  onClick={() => openModal('sipBusiness')}
                >
                  <Image
                    src="/icons/IcTwotoneRemoveRedEye.svg"
                    alt="View"
                    width={16}
                    height={16}
                    className="invert-0 dark:invert"
                  />
                  View Report
                </button>
              }
              className="lg:col-span-1"
            >
              {loadingCharts ? (
                <ChartSkeleton />
              ) : (
                <SipBusinessChart data={sipBiz} loading={loadingCharts} />
              )}
            </Card>
          </div>

          <div ref={monthlyMisChartRef}>
            <Card
              title="MONTHLY MIS"
              action={
                <button 
                  className="btn flex items-center gap-2"
                  onClick={() => openModal('monthlyMis')}
                >
                  <Image
                    src="/icons/IcTwotoneRemoveRedEye.svg"
                    alt="View"
                    width={16}
                    height={16}
                    className="invert-0 dark:invert"
                  />
                  View Report
                </button>
              }
              className="lg:col-span-1"
            >
              {loadingCharts ? (
                <ChartSkeleton />
              ) : (
                <MonthlyMisChart data={mis} loading={loadingCharts} />
              )}
            </Card>
          </div>
        </div>
      </main>

      <ReportModal 
        isOpen={activeModal === 'aum'} 
        onClose={() => setActiveModal(null)}
        title="AUM Report"
        onDownload={() => handleDownload(aumCardRef, 'AUM_Report')}
      >
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">AUM Overview</h3>
          <div className="space-y-4">
            <div className="text-4xl font-bold text-gray-900 dark:text-white">
              {aum?.value} <span className="text-xl font-medium">Cr</span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              <span className="text-green-500">▲ {aum?.mom}%</span> MoM Growth
            </div>
          </div>
        </div>
      </ReportModal>

      <ReportModal 
        isOpen={activeModal === 'sip'} 
        onClose={() => setActiveModal(null)}
        title="SIP Report"
        onDownload={() => handleDownload(sipCardRef, 'SIP_Report')}
      >
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">SIP Overview</h3>
          <div className="space-y-4">
            <div className="text-4xl font-bold text-gray-900 dark:text-white">
              {sip?.value} <span className="text-xl font-medium">Lakh</span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              <span className="text-green-500">▲ {sip?.mom}%</span> MoM Growth
            </div>
          </div>
        </div>
      </ReportModal>

      <ReportModal 
        isOpen={activeModal === 'sipBusiness'} 
        onClose={() => setActiveModal(null)}
        title="SIP Business Chart"
        onDownload={() => handleDownload(sipBusinessChartRef, 'SIP_Business_Chart')}
      >
        <div className="h-[500px] w-full">
          {loadingCharts ? (
            <ChartSkeleton />
          ) : (
            <SipBusinessChart data={sipBiz} loading={loadingCharts} />
          )}
        </div>
      </ReportModal>

      <ReportModal 
        isOpen={activeModal === 'monthlyMis'} 
        onClose={() => setActiveModal(null)}
        title="Monthly MIS"
        onDownload={() => handleDownload(monthlyMisChartRef, 'Monthly_MIS_Chart')}
      >
        <div className="h-[500px] w-full">
          {loadingCharts ? (
            <ChartSkeleton />
          ) : (
            <MonthlyMisChart data={mis} loading={loadingCharts} />
          )}
        </div>
      </ReportModal>
    </div>
  );
}