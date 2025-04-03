"use client"

import * as React from "react"
import { Tooltip, TooltipProps } from "recharts"
import { cn } from "@/lib/utils"

export interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
}

export function ChartContainer({
  config,
  className,
  children,
  ...props
}: ChartContainerProps) {
  const createCSSVariables = React.useMemo(() => {
    return Object.entries(config).reduce((acc, [key, value]) => {
      return {
        ...acc,
        [`--color-${key}`]: value.color,
      }
    }, {})
  }, [config])

  return (
    <div
      className={cn("h-80", className)}
      style={createCSSVariables as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  )
}

interface ChartTooltipContentProps {
  active?: boolean
  payload?: {
    name: string
    value: number
    payload: Record<string, any>
  }[]
  label?: string
  config?: ChartConfig
  className?: string
}

export function ChartTooltipContent({
  active,
  payload,
  label,
  config,
  className,
  ...props
}: ChartTooltipContentProps) {
  if (!active || !payload?.length || !config) {
    return null
  }

  return (
    <div
      className={cn(
        "rounded-lg border bg-background p-2 shadow-sm",
        className
      )}
      {...props}
    >
      <div className="grid gap-2">
        <div className="text-xs font-medium">{label}</div>
        <div className="grid gap-1">
          {payload.map((data) => {
            const color = config[data?.name]?.color
            return (
              <div
                key={data.name}
                className="flex items-center justify-between gap-2 text-xs"
              >
                <div className="flex items-center gap-1">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span>{config[data.name]?.label ?? data.name}</span>
                </div>
                <div className="font-medium">{data.value.toLocaleString()}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Esta é uma versão simplificada que apenas re-exporta o Tooltip do recharts
// com algumas propriedades padrão
export { Tooltip as ChartTooltip } 