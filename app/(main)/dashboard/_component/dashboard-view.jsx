
"use client";

import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Briefcase, Activity, TrendingUp, TrendingDown, Brain, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const DashboardView = ({ insights }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setMounted(true), 50);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const salaryData = insights.salaryRanges.map((range) => ({
    name: range.role,
    min: range.min / 1000,
    max: range.max / 1000,
    median: range.median / 1000,
  }));

  const getDemandLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return "bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400";
      case "medium":
        return "bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400";
      case "low":
        return "bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400";
      default:
        return "bg-gradient-to-r from-slate-400 to-gray-400";
    }
  };

  const getMarketOutlookInfo = (outlook) => {
    switch (outlook.toLowerCase()) {
      case "positive":
        return { icon: TrendingUp, color: "text-emerald-400", bgColor: "bg-emerald-500/10" };
      case "neutral":
        return { icon: Activity, color: "text-amber-400", bgColor: "bg-amber-500/10" };
      case "negative":
        return { icon: TrendingDown, color: "text-rose-400", bgColor: "bg-rose-500/10" };
      default:
        return { icon: Activity, color: "text-slate-400", bgColor: "bg-slate-500/10" };
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatDistanceToNow = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = date - now;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffDays > 0) {
      return `in ${diffDays} day${diffDays !== 1 ? 's' : ''}`;
    } else if (diffHours > 0) {
      return `in ${diffHours} hour${diffHours !== 1 ? 's' : ''}`;
    } else {
      return 'soon';
    }
  };

  const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
  const outlookColor = getMarketOutlookInfo(insights.marketOutlook).color;
  const outlookBg = getMarketOutlookInfo(insights.marketOutlook).bgColor;

  const lastUpdatedDate = formatDate(insights.lastUpdated);
  const nextUpdateDistance = formatDistanceToNow(insights.nextUpdate);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Sparkles className="w-8 h-8 text-cyan-400 animate-pulse" />
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-500/20 rounded-full blur-xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.03) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }}></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="relative z-10 p-6 space-y-6">
        {/* Header Badge */}
        <div className={`flex justify-between items-center transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 px-4 py-1.5">
            <span className="relative flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              Last updated: {lastUpdatedDate}
            </span>
          </Badge>
        </div>

        {/* Market Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Market Outlook Card */}
          <Card 
            className={`group bg-slate-900/40 border-slate-800/50 backdrop-blur-xl hover:bg-slate-900/60 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '100ms' }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300 group-hover:text-cyan-400 transition-colors duration-300">
                Market Outlook
              </CardTitle>
              <div className={`p-2.5 rounded-xl ${outlookBg} transition-all duration-300 group-hover:scale-110 group-hover:rotate-12`}>
                <OutlookIcon className={`h-4 w-4 ${outlookColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-br from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                {insights.marketOutlook}
              </div>
              <p className="text-xs text-slate-500 mt-2 group-hover:text-slate-400 transition-colors duration-300">
                Next update {nextUpdateDistance}
              </p>
            </CardContent>
          </Card>

          {/* Industry Growth Card */}
          <Card 
            className={`group bg-slate-900/40 border-slate-800/50 backdrop-blur-xl hover:bg-slate-900/60 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300 group-hover:text-emerald-400 transition-colors duration-300">
                Industry Growth
              </CardTitle>
              <div className="p-2.5 rounded-xl bg-emerald-500/10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                <TrendingUp className="h-4 w-4 text-emerald-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                {insights.growthRate.toFixed(1)}%
              </div>
              <Progress 
                value={insights.growthRate} 
                className="mt-3 h-2 bg-slate-800/50 group-hover:bg-slate-800 transition-colors duration-300 [&>div]:bg-gradient-to-r [&>div]:from-emerald-500 [&>div]:via-teal-500 [&>div]:to-cyan-500 [&>div]:shadow-lg [&>div]:shadow-emerald-500/30"
              />
            </CardContent>
          </Card>

          {/* Demand Level Card */}
          <Card 
            className={`group bg-slate-900/40 border-slate-800/50 backdrop-blur-xl hover:bg-slate-900/60 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300 group-hover:text-blue-400 transition-colors duration-300">
                Demand Level
              </CardTitle>
              <div className="p-2.5 rounded-xl bg-blue-500/10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                <Briefcase className="h-4 w-4 text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                {insights.demandLevel}
              </div>
              <div className={`h-2.5 w-full rounded-full mt-3 ${getDemandLevelColor(insights.demandLevel)} shadow-lg group-hover:shadow-xl transition-all duration-300`}></div>
            </CardContent>
          </Card>

          {/* Top Skills Card */}
          <Card 
            className={`group bg-slate-900/40 border-slate-800/50 backdrop-blur-xl hover:bg-slate-900/60 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '400ms' }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300 group-hover:text-purple-400 transition-colors duration-300">
                Top Skills
              </CardTitle>
              <div className="p-2.5 rounded-xl bg-purple-500/10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                <Brain className="h-4 w-4 text-purple-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1.5">
                {insights.topSkills.map((skill) => (
                  <Badge 
                    key={skill} 
                    className="bg-purple-500/10 text-purple-300 border-purple-500/30 hover:bg-purple-500/20 hover:border-purple-400 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 cursor-pointer"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Salary Ranges Chart */}
        <Card 
          className={`group bg-slate-900/40 border-slate-800/50 backdrop-blur-xl hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '500ms' }}
        >
          <CardHeader>
            <CardTitle className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent text-xl font-bold">
              Salary Ranges by Role
            </CardTitle>
            <CardDescription className="text-slate-400">
              Displaying minimum, median, and maximum salaries (in thousands)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salaryData}>
                  <defs>
                    <linearGradient id="colorMin" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.9} />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.4} />
                    </linearGradient>
                    <linearGradient id="colorMedian" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.4} />
                    </linearGradient>
                    <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.9} />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.4} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.3} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip
                    cursor={{ fill: 'rgba(6, 182, 212, 0.1)' }}
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-slate-900/95 border border-cyan-500/30 rounded-xl p-4 shadow-2xl backdrop-blur-xl">
                            <p className="font-bold text-cyan-400 mb-3 text-base">{label}</p>
                            {payload.map((item) => (
                              <p key={item.name} className="text-sm text-slate-300 mb-1 flex items-center justify-between gap-4">
                                <span>{item.name}:</span>
                                <span className="text-cyan-400 font-bold">${item.value}K</span>
                              </p>
                            ))}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="min" fill="url(#colorMin)" name="Min Salary (K)" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="median" fill="url(#colorMedian)" name="Median Salary (K)" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="max" fill="url(#colorMax)" name="Max Salary (K)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Industry Trends Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Key Industry Trends */}
          <Card 
            className={`group bg-slate-900/40 border-slate-800/50 backdrop-blur-xl hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-700 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
            style={{ transitionDelay: '600ms' }}
          >
            <CardHeader>
              <CardTitle className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent text-lg font-bold">
                Key Industry Trends
              </CardTitle>
              <CardDescription className="text-slate-400">
                Current trends shaping the industry
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {insights.keyTrends.map((trend, index) => (
                  <li 
                    key={index} 
                    className="flex items-start space-x-3 group/item hover:translate-x-2 transition-all duration-300 cursor-pointer p-2 rounded-lg hover:bg-slate-800/30"
                  >
                    <div className="h-2 w-2 mt-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 group-hover/item:scale-150 group-hover/item:shadow-lg group-hover/item:shadow-cyan-500/50 transition-all duration-300" />
                    <span className="text-slate-300 group-hover/item:text-cyan-400 transition-colors duration-300 text-sm leading-relaxed">{trend}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Recommended Skills */}
          <Card 
            className={`group bg-slate-900/40 border-slate-800/50 backdrop-blur-xl hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-700 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
            style={{ transitionDelay: '600ms' }}
          >
            <CardHeader>
              <CardTitle className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent text-lg font-bold">
                Recommended Skills
              </CardTitle>
              <CardDescription className="text-slate-400">
                Skills to consider developing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {insights.recommendedSkills.map((skill) => (
                  <Badge 
                    key={skill} 
                    className="bg-gradient-to-r from--500/10 to-purple-500/10 text-cyan-300 border-cyan-300/30  hover:border-cyan-400 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 cursor-pointer px-3 py-1"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
      `}</style>
    </div>
  );
};


export default DashboardView;