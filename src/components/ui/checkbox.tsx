import { Check } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
	HTMLButtonElement,
	React.ButtonHTMLAttributes<HTMLButtonElement> & { checked?: boolean }
>(({ className, checked, ...props }, ref) => (
	<button
		ref={ref}
		type="button"
		role="checkbox"
		aria-checked={checked}
		className={cn(
			"peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground flex items-center justify-center",
			className,
		)}
		{...props}
	>
		{checked && <Check className="h-3 w-3" />}
	</button>
));
Checkbox.displayName = "Checkbox";

export { Checkbox };
