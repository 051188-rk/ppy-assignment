"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import TimeFilterBar from "./components/TimeFilterBar";
import StatCard from "./components/StatCard";
import ClientsBubbleChart from "./components/ClientsBubbleChart";
import SipBusinessChart from "./components/SipBusinessChart";
import MonthlyMisChart from "./components/MonthlyMisChart";
import ChartSkeleton from "./components/ChartSkeleton";
import ThemeToggle from "./components/ThemeToggle";

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

  const loadAll = async (r) => {
    setLoadingTop(true);
    setLoadingStats(true);
    setLoadingCharts(true);

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

    setLoadingTop(false);
    setLoadingStats(false);
    setLoadingCharts(false);
  };

  useEffect(() => {
    loadAll(range);
  }, [range]);

  return (
    <div>
      {/* Navbar with theme toggle */}
      <Navbar>
        <ThemeToggle />
      </Navbar>

      <main className="mx-auto max-w-7xl px-4 py-6 space-y-6">
        {/* AUM/SIP cards */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card
            title="Current"
            action={
              <button className="btn flex items-center gap-2">
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
                  {aum.value}{" "}
                  <span className="text-base font-medium">Cr</span>
                </div>
                <div className="badge">▲ {aum.mom}% MoM</div>
              </div>
            )}
          </Card>

          <Card
            title="Current"
            action={
              <button className="btn flex items-center gap-2">
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
                  {sip.value}{" "}
                  <span className="text-base font-medium">Lakh</span>
                </div>
                <div className="badge">▲ {sip.mom}% MoM</div>
              </div>
            )}
          </Card>
        </div>

        {/* Time filter */}
        <TimeFilterBar onChange={setRange} />

        {/* Stat cards */}
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

        {/* Charts */}
        <div className="grid lg:grid-cols-3 gap-4">
          <Card
            title="CLIENTS"
            action={
              <button className="btn flex items-center gap-2">
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
              <ClientsBubbleChart data={{}} loading={false} />
            )}
          </Card>

          <Card
            title="SIP BUSINESS CHART"
            action={
              <button className="btn flex items-center gap-2">
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
            <SipBusinessChart data={sipBiz} loading={loadingCharts} />
          </Card>

          <Card
            title="MONTHLY MIS"
            action={
              <button className="btn flex items-center gap-2">
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
            <MonthlyMisChart data={mis} loading={loadingCharts} />
          </Card>
        </div>
      </main>
    </div>
  );
}
