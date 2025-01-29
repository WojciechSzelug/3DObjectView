// src/modules/ColorControls.jsx
import React from 'react'

const ColorControls = ({ onColorChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target
    onColorChange(name, parseInt(value))
  }

  const sliderStyle = {
    width: '200px',
    margin: '10px 0'
  }

  const containerStyle = {
    position: 'absolute',
    top: '10px',
    left: '10px',
    background: 'rgba(255, 255, 255, 0.8)',
    padding: '20px',
    borderRadius: '8px',
    zIndex: 1000
  }

  return (
    <div style={containerStyle}>
      <div>
        <label>
          R: 
          <input
            type="range"
            name="r"
            min="0"
            max="255"
            defaultValue="255"
            onChange={handleChange}
            style={sliderStyle}
          />
        </label>
      </div>
      <div>
        <label>
          G: 
          <input
            type="range"
            name="g"
            min="0"
            max="255"
            defaultValue="165"
            onChange={handleChange}
            style={sliderStyle}
          />
        </label>
      </div>
      <div>
        <label>
          B: 
          <input
            type="range"
            name="b"
            min="0"
            max="255"
            defaultValue="0"
            onChange={handleChange}
            style={sliderStyle}
          />
        </label>
      </div>
      <div>
        <label>
          Alpha: 
          <input
            type="range"
            name="a"
            min="0"
            max="255"
            defaultValue="255"
            onChange={handleChange}
            style={sliderStyle}
          />
        </label>
      </div>
    </div>
  )
}

export default ColorControls