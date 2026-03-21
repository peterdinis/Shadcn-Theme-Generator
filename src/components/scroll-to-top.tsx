"use client";

import { ArrowUp } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SCROLL_ATTR = "[data-app-scroll]";

function getScrollRegions(): HTMLElement[] {
	return Array.from(document.querySelectorAll<HTMLElement>(SCROLL_ATTR));
}

export function ScrollToTop() {
	const [visible, setVisible] = useState(false);

	const updateVisible = useCallback(() => {
		if (typeof window === "undefined") return;
		if (window.scrollY > 100) {
			setVisible(true);
			return;
		}
		const scrolled = getScrollRegions().some((el) => el.scrollTop > 80);
		setVisible(scrolled);
	}, []);

	const scrollToTop = useCallback(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
		getScrollRegions().forEach((el) => {
			el.scrollTo({ top: 0, behavior: "smooth" });
		});
	}, []);

	useEffect(() => {
		updateVisible();
		window.addEventListener("scroll", updateVisible, { passive: true });

		const attached = new Set<HTMLElement>();
		const attachListeners = () => {
			getScrollRegions().forEach((el) => {
				if (!attached.has(el)) {
					el.addEventListener("scroll", updateVisible, { passive: true });
					attached.add(el);
				}
			});
		};

		attachListeners();
		const raf = requestAnimationFrame(attachListeners);
		const t = window.setTimeout(attachListeners, 0);

		return () => {
			cancelAnimationFrame(raf);
			window.clearTimeout(t);
			window.removeEventListener("scroll", updateVisible);
			attached.forEach((el) =>
				el.removeEventListener("scroll", updateVisible),
			);
		};
	}, [updateVisible]);

	return (
		<Button
			type="button"
			variant="secondary"
			size="icon"
			onClick={scrollToTop}
			className={cn(
				"fixed bottom-6 right-6 z-[100] size-11 rounded-full border border-border/80 bg-card/95 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-card",
				visible
					? "pointer-events-auto translate-y-0 opacity-100"
					: "pointer-events-none translate-y-3 opacity-0",
			)}
			aria-label="Scroll to top"
			title="Scroll to top"
		>
			<ArrowUp className="size-5" />
		</Button>
	);
}
