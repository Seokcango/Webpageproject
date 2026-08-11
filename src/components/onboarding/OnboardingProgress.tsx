type OnboardingProgressProps = {
  current: number;
  total: number;
};

export function OnboardingProgress({ current, total }: OnboardingProgressProps) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="flex-1 h-1.5 bg-[#E5E5E5] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#0057D8] transition-all duration-300 ease-in-out"
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
      <span className="text-sm font-medium text-[#767676] shrink-0">
        {current} / {total}
      </span>
    </div>
  );
}
