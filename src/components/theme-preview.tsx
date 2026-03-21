"use client";

import {
	BarChart3,
	Bell,
	Check,
	ChevronRight,
	CreditCard,
	Layers,
	LayoutDashboard,
	Loader2,
	Mail,
	Palette,
	Plus,
	Search,
	Settings,
	User,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useThemeStore } from "@/lib/store";
import { CodePreview } from "./code-preview";
import { DataTablePreview } from "./data-table-preview";
import { ExportDialog } from "./export-dialog";
import { PaletteGrid } from "./palette-grid";

export function ThemePreview() {
	const [showToast, setShowToast] = useState(false);

	const triggerToast = () => {
		setShowToast(true);
		setTimeout(() => setShowToast(false), 3000);
	};

	const { config } = useThemeStore();

	return (
		<div
			className="relative min-h-0 min-h-[55vh] flex-1 overflow-y-auto bg-muted/25 p-4 md:min-h-0 md:p-8"
			data-app-scroll
		>
			<div className="mx-auto max-w-5xl space-y-8">
				<div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
					<div>
						<div className="mb-2 flex flex-wrap items-center gap-2">
							<span className="rounded bg-primary px-2 py-0.5 text-[10px] font-bold tracking-widest text-primary-foreground uppercase">
								Live
							</span>
							<span className="text-[10px] font-medium tracking-widest text-muted-foreground uppercase">
								{config.name}
							</span>
						</div>
						<h1 className="mb-2 text-3xl font-black tracking-tight md:text-4xl">
							Theme preview
						</h1>
						<p className="max-w-xl text-base text-muted-foreground md:text-lg">
							Components and layouts update as you edit tokens—OKLCH variables,
							typography, and radius stay in sync.
						</p>
					</div>
					<div className="flex shrink-0 items-center gap-3">
						<ExportDialog />
					</div>
				</div>

				<Tabs defaultValue="preview" className="w-full space-y-6 md:space-y-8">
					<TabsList className="h-auto w-full flex-wrap justify-start gap-1 bg-muted/50 p-1 md:inline-flex md:w-auto md:flex-nowrap">
						<TabsTrigger value="preview" className="gap-2 px-4 md:px-6">
							<LayoutDashboard className="size-4" />
							Components
						</TabsTrigger>
						<TabsTrigger value="data-table" className="gap-2 px-4 md:px-6">
							<Layers className="size-4" />
							Data table
						</TabsTrigger>
						<TabsTrigger value="palette" className="gap-2 px-4 md:px-6">
							<Palette className="size-4" />
							Palette
						</TabsTrigger>
						<TabsTrigger value="code" className="gap-2 px-4 md:px-6">
							<Settings className="size-4" />
							Code
						</TabsTrigger>
					</TabsList>

					<TabsContent
						value="preview"
						className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500"
					>
						{/* Dashboard Mockup */}
						<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
							{/* Fake Sidebar Preview */}
							<div className="lg:col-span-3 space-y-6">
								<Card className="border-none shadow-sm h-full">
									<CardContent className="p-4 space-y-4">
										<div className="flex items-center gap-2 p-2 rounded-lg bg-primary/10 text-primary">
											<LayoutDashboard className="w-4 h-4" />
											<span className="text-xs font-bold">Dashboard</span>
										</div>
										{[
											{ icon: User, label: "Users" },
											{ icon: Mail, label: "Email" },
											{ icon: Bell, label: "Alerts" },
											{ icon: Settings, label: "Settings" },
										].map((item) => (
											<div
												key={item.label}
												className="flex items-center justify-between p-2 rounded-lg hover:bg-muted font-medium text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer group"
											>
												<div className="flex items-center gap-2">
													<item.icon className="w-4 h-4" />
													<span>{item.label}</span>
												</div>
												<ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
											</div>
										))}
									</CardContent>
								</Card>
							</div>

							{/* Stats & Main View */}
							<div className="lg:col-span-9 space-y-8">
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
									{[
										{
											label: "Total Revenue",
											val: "$45,231.89",
											trend: "+20.1%",
											icon: CreditCard,
										},
										{
											label: "Subscriptions",
											val: "+2350",
											trend: "+180.1%",
											icon: User,
										},
										{
											label: "Active Now",
											val: "+573",
											trend: "+201",
											icon: BarChart3,
										},
									].map((stat) => (
										<Card key={stat.label} className="border-none shadow-sm">
											<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
												<CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
													{stat.label}
												</CardTitle>
												<stat.icon className="h-4 w-4 text-primary" />
											</CardHeader>
											<CardContent>
												<div className="text-2xl font-bold">{stat.val}</div>
												<p className="text-[10px] text-muted-foreground mt-1">
													<span className="text-emerald-500 font-bold mr-1">
														{stat.trend}
													</span>
													from last month
												</p>
											</CardContent>
										</Card>
									))}
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
									{/* Form Section */}
									<Card className="border-none shadow-sm">
										<CardHeader>
											<CardTitle className="text-lg">
												Project Settings
											</CardTitle>
											<CardDescription>
												Manage your team and project preferences.
											</CardDescription>
										</CardHeader>
										<CardContent className="space-y-4">
											<div className="space-y-2">
												<Label
													htmlFor="p-name"
													className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
												>
													Project Name
												</Label>
												<Input id="p-name" defaultValue="Theme Generator Pro" />
											</div>
											<div className="space-y-2">
												<Label
													htmlFor="vis"
													className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
												>
													Visibility
												</Label>
												<Select defaultValue="public">
													<SelectTrigger id="vis">
														<SelectValue />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="public">Public</SelectItem>
														<SelectItem value="private">Private</SelectItem>
														<SelectItem value="internal">
															Internal Only
														</SelectItem>
													</SelectContent>
												</Select>
											</div>
											<div className="flex items-center justify-between pt-4 border-t border-border/50">
												<div className="space-y-0.5">
													<Label className="text-sm font-bold">Auto-sync</Label>
													<p className="text-[10px] text-muted-foreground">
														Sync changes to the cloud.
													</p>
												</div>
												<Switch defaultChecked />
											</div>
										</CardContent>
										<CardFooter className="flex justify-between bg-muted/30 pt-6">
											<Button variant="ghost" size="sm">
												Cancel
											</Button>
											<Button size="sm" onClick={triggerToast}>
												Update Project
											</Button>
										</CardFooter>
									</Card>

									{/* Activity/Tabs */}
									<Card className="border-none shadow-sm">
										<CardHeader className="pb-2">
											<CardTitle className="text-lg">Recent Activity</CardTitle>
										</CardHeader>
										<CardContent>
											<Tabs defaultValue="all" className="w-full">
												<TabsList className="grid w-full grid-cols-3 mb-6 bg-muted/50 p-1 h-8">
													<TabsTrigger
														value="all"
														className="text-[10px] uppercase font-bold"
													>
														All
													</TabsTrigger>
													<TabsTrigger
														value="tasks"
														className="text-[10px] uppercase font-bold"
													>
														Tasks
													</TabsTrigger>
													<TabsTrigger
														value="team"
														className="text-[10px] uppercase font-bold"
													>
														Team
													</TabsTrigger>
												</TabsList>
												<TabsContent value="all" className="space-y-4">
													{[
														{
															name: "Satoshi Nakamoto",
															action: "pushed a new theme",
															time: "2h ago",
														},
														{
															name: "Vitalik Buterin",
															action: "created Midnight preset",
															time: "5h ago",
														},
														{
															name: "Ada Lovelace",
															action: "fixed radius calculation",
															time: "12h ago",
														},
													].map((item, i) => (
														<div
															key={i}
															className="flex items-center gap-3 group transition-transform hover:translate-x-1"
														>
															<div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
																{item.name.charAt(0)}
															</div>
															<div className="flex-1 space-y-0.5">
																<p className="text-xs font-bold line-clamp-1">
																	{item.name}
																</p>
																<p className="text-[10px] text-muted-foreground">
																	{item.action} •{" "}
																	<span className="italic">{item.time}</span>
																</p>
															</div>
														</div>
													))}
												</TabsContent>
											</Tabs>
										</CardContent>
										<CardFooter className="pt-2">
											<Button
												variant="outline"
												className="w-full border-dashed group"
												size="sm"
											>
												<Plus className="w-3 h-3 mr-2 group-hover:rotate-90 transition-transform" />
												Add New Task
											</Button>
										</CardFooter>
									</Card>
								</div>
							</div>
						</div>

						{/* Kitchen Sink Cards */}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8 border-t border-border/50">
							<div className="space-y-8">
								<Card className="border-none shadow-sm overflow-hidden group">
									<div className="h-24 bg-primary transition-all group-hover:h-32" />
									<CardHeader className="relative -mt-12 bg-transparent text-center">
										<div className="w-20 h-20 rounded-full border-4 border-background bg-zinc-200 mx-auto overflow-hidden shadow-xl ring-2 ring-primary/20">
											<div className="w-full h-full bg-gradient-to-br from-primary/50 to-primary flex items-center justify-center text-primary-foreground font-black text-2xl">
												JD
											</div>
										</div>
										<CardTitle className="pt-2">Jane Doe</CardTitle>
										<CardDescription>Product Designer</CardDescription>
									</CardHeader>
									<CardContent className="text-center pb-6">
										<p className="text-xs text-muted-foreground italic max-w-[200px] mx-auto mb-4">
											"Design is not just what it looks like and feels like.
											Design is how it works."
										</p>
										<div className="flex justify-center gap-2">
											<Button
												size="sm"
												variant="outline"
												className="rounded-full px-4 text-xs font-bold"
											>
												Follow
											</Button>
											<Button
												size="sm"
												className="rounded-full px-4 text-xs font-bold"
											>
												Message
											</Button>
										</div>
									</CardContent>
								</Card>
							</div>

							<Card className="border-none shadow-sm flex flex-col justify-center items-center p-8 text-center space-y-6">
								<div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center ring-1 ring-border/50 shadow-inner">
									<Search className="w-8 h-8 text-muted-foreground/50" />
								</div>
								<div className="space-y-1">
									<h3 className="font-bold">No results found</h3>
									<p className="text-xs text-muted-foreground max-w-[200px]">
										Your search for "perfect theme" didn't return any matches.
										Try adjusting your filters.
									</p>
								</div>
								<Button
									variant="secondary"
									size="sm"
									className="px-8 font-bold"
								>
									Clear Filters
								</Button>
							</Card>

							<Card className="border-none shadow-sm relative overflow-hidden">
								<div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-[8px] font-black text-white uppercase tracking-widest animate-pulse">
									Live
								</div>
								<CardHeader>
									<CardTitle className="text-lg">Interactions</CardTitle>
								</CardHeader>
								<CardContent className="space-y-6">
									<div className="flex flex-wrap gap-2">
										<Button size="sm">Default</Button>
										<Button size="sm" variant="secondary">
											Secondary
										</Button>
										<Button size="sm" variant="outline">
											Outline
										</Button>
										<Button variant="ghost" size="icon" className="h-8 w-8">
											<Settings className="w-4 h-4" />
										</Button>
									</div>
									<div className="flex flex-wrap gap-2">
										<Badge>Default</Badge>
										<Badge variant="secondary">Secondary</Badge>
										<Badge variant="outline">Outline</Badge>
										<Badge variant="destructive">Destructive</Badge>
									</div>
									<div className="space-y-3 pt-4 border-t border-border/50">
										<div className="flex items-center justify-between">
											<Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
												System Volume
											</Label>
											<span className="text-[10px] font-mono text-primary">
												75%
											</span>
										</div>
										<Slider defaultValue={[75]} max={100} step={1} />
									</div>
									<div className="flex items-center gap-2 pt-2">
										<Button
											variant="destructive"
											size="sm"
											className="flex-1 font-bold"
										>
											Terminate Session
										</Button>
										<Button
											variant="outline"
											size="sm"
											disabled
											className="flex-1 font-bold gap-2"
										>
											<Loader2 className="w-3 h-3 animate-spin" />
											Loading
										</Button>
									</div>
								</CardContent>
							</Card>
						</div>
					</TabsContent>

					<TabsContent value="palette">
						<PaletteGrid />
					</TabsContent>

					<TabsContent
						value="data-table"
						className="animate-in fade-in slide-in-from-bottom-4 duration-500"
					>
						<Card className="p-8 border-border/50 bg-card/50 shadow-xl">
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<div className="space-y-1">
										<h3 className="text-xl font-bold">Transaction History</h3>
										<p className="text-sm text-muted-foreground">
											Manage and review your latest invoice records.
										</p>
									</div>
									<div className="flex gap-2">
										<Button variant="outline" size="sm">
											Export CSV
										</Button>
										<Button size="sm">New Transaction</Button>
									</div>
								</div>
								<DataTablePreview />
							</div>
						</Card>
					</TabsContent>

					<TabsContent
						value="code"
						className="animate-in fade-in slide-in-from-bottom-4 duration-500"
					>
						<CodePreview />
					</TabsContent>
				</Tabs>
			</div>

			{/* Mock Toast */}
			{showToast && (
				<div className="fixed bottom-8 right-8 animate-in slide-in-from-right-full fade-in duration-300 z-50">
					<Card className="p-4 bg-card shadow-2xl border-primary ring-1 ring-primary/20 min-w-[300px] flex items-center gap-4">
						<div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
							<Check className="w-5 h-5" />
						</div>
						<div className="space-y-1">
							<p className="text-sm font-bold">Theme Updated Successfully</p>
							<p className="text-xs text-muted-foreground font-medium">
								Your changes have been applied in real-time.
							</p>
						</div>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setShowToast(false)}
							className="ml-auto opacity-50 hover:opacity-100"
						>
							Close
						</Button>
					</Card>
				</div>
			)}
		</div>
	);
}
