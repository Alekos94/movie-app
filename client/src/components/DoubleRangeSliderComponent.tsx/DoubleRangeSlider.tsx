import { useState } from "react"
import { getTrackBackground, Range } from "react-range"
import './DoubleRangeSlider.css'
type SliderPorps = {
  step: number
  min: number
  max: number
  values: number[]
  setValues: React.Dispatch<React.SetStateAction<number[]>>
}
export function DoubleRangeSlider({step, min, max, values, setValues} : SliderPorps ) {

  return (
    <div className="range-filter-container">
    <Range
              label="Select your value"
              step={step}
              min={min}
              max={max}
              values={values}
              onChange={(values) => setValues(values)}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "6px",
                    width: "100%",
                    background: getTrackBackground({
                      values: values,
                      colors:['rgb(125, 120, 112)','rgb(245, 124, 0)','rgb(125, 120, 112)'],
                      min,
                      max
                    }),
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  key={props.key}
                  style={{
                    ...props.style,
                    height: "1rem",
                    width: "1rem",
                    backgroundColor: "rgb(210, 100, 0)",
                    borderRadius: '50%',
                  }}
                />
              )}
            />
            <div className="range-values">
              <span>{values[0]}</span>
              <span>{values[1]}</span>
            </div>
            </div>
  )
}