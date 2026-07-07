'use client'

import * as d3 from 'd3'
import { useEffect, useRef } from 'react'

/**
 * D3.js AI Mind Illustration — organic hand-drawn style. Faithful port of
 * the legacy inline script from index.html; wrapped for SPA navigation
 * (container cleared on mount, loops/listeners disposed on unmount).
 */
export default function NeuralNetwork() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    container.innerHTML = ''

    let disposed = false
    const timeouts: ReturnType<typeof setTimeout>[] = []

    const width = 420
    const height = 420
    const cx = width / 2
    const cy = height / 2

    function getCSSVariable(name: string) {
      return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
    }

    // Page visibility - 防止 tab 切换时动画淤积
    let isPageVisible = !document.hidden
    const onVisibilityChange = () => {
      isPageVisible = !document.hidden
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    let accentColor = getCSSVariable('--color-accent') || '#d97757'
    let darkColor = getCSSVariable('--color-text') || '#191918'

    const svg = d3
      .select(container)
      .append('svg')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('class', 'hero-illustration')
      .style('cursor', 'pointer')
      .attr('aria-hidden', 'true') // Decorative

    // Add slight hand-drawn effect with filter
    const defs = svg.append('defs')
    const filter = defs
      .append('filter')
      .attr('id', 'hand-drawn')
      .attr('x', '-20%')
      .attr('y', '-20%')
      .attr('width', '140%')
      .attr('height', '140%')
    filter
      .append('feTurbulence')
      .attr('type', 'fractalNoise')
      .attr('baseFrequency', '0.04')
      .attr('numOctaves', '1')
      .attr('result', 'noise')
    filter
      .append('feDisplacementMap')
      .attr('in', 'SourceGraphic')
      .attr('in2', 'noise')
      .attr('scale', '2')
      .attr('xChannelSelector', 'R')
      .attr('yChannelSelector', 'G')

    const mainGroup = svg.append('g').attr('filter', 'url(#hand-drawn)')

    // Draw concentric arcs (fingerprint/mind waves) - scaled up
    const arcGroup = mainGroup.append('g').attr('class', 'arcs')
    const arcRadii = [60, 85, 110, 135, 165]

    type NodeDatum = { x: number; y: number; r: number; type: 'input' | 'hidden' | 'output' }

    const pathElements: d3.Selection<SVGPathElement, unknown, null, undefined>[] = []
    let nodeElementsSelect: d3.Selection<SVGCircleElement, NodeDatum, SVGGElement, unknown> | null =
      null
    let linkElementsSelect: d3.Selection<SVGPathElement, unknown, SVGGElement, unknown> | null =
      null

    // Theme Change Listener (System)
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onSystemTheme = () => {
      if (!localStorage.getItem('theme')) updateColors()
    }
    mq.addEventListener('change', onSystemTheme)

    // Theme Change Listener (Manual Toggle)
    const onThemeChanged = () => updateColors()
    window.addEventListener('themeChanged', onThemeChanged)

    function updateColors() {
      // Small delay to allow CSS to update
      timeouts.push(
        setTimeout(() => {
          if (disposed) return
          accentColor = getCSSVariable('--color-accent')
          darkColor = getCSSVariable('--color-text')

          if (pathElements.length) {
            pathElements.forEach((p) => p.attr('fill', darkColor))
          }
          if (nodeElementsSelect) {
            nodeElementsSelect
              .attr('fill', (d) => (d.type === 'output' ? accentColor : darkColor))
              .attr('stroke', (d) => (d.type === 'output' ? accentColor : darkColor))
          }
          if (linkElementsSelect) {
            linkElementsSelect.attr('stroke', darkColor)
          }
        }, 100),
      )
    }

    arcRadii.forEach((r, i) => {
      const startAngle = -Math.PI * 0.7
      const endAngle = Math.PI * 0.4
      const targetOpacity = 0.12 + i * 0.03

      const arc = d3
        .arc()
        .innerRadius(r - 3)
        .outerRadius(r)
        .startAngle(startAngle)
        .endAngle(endAngle)

      const p = arcGroup
        .append('path')
        .attr('d', arc as unknown as string)
        .attr('transform', `translate(${cx - 25}, ${cy + 15})`)
        .attr('fill', darkColor)
        .attr('opacity', 0)
        .attr('class', `arc-${i}`)

      pathElements.push(p)

      p.transition()
        .duration(800)
        .delay(600 + i * 100)
        .ease(d3.easeQuadOut)
        .attr('opacity', targetOpacity)
    })

    // Neural network nodes - scaled up positions
    const nodes: NodeDatum[] = [
      { x: cx - 80, y: cy - 95, r: 11, type: 'input' },
      { x: cx - 112, y: cy - 25, r: 10, type: 'input' },
      { x: cx - 95, y: cy + 55, r: 11, type: 'input' },
      { x: cx, y: cy - 65, r: 14, type: 'hidden' },
      { x: cx + 15, y: cy + 15, r: 16, type: 'hidden' },
      { x: cx - 25, y: cy + 82, r: 12, type: 'hidden' },
      { x: cx + 82, y: cy - 40, r: 15, type: 'output' },
      { x: cx + 95, y: cy + 55, r: 14, type: 'output' },
    ]

    // Connections - organic curved paths
    const connections: [number, number][] = [
      [0, 3], [0, 4], [1, 3], [1, 4], [1, 5], [2, 4], [2, 5],
      [3, 6], [3, 7], [4, 6], [4, 7], [5, 7],
    ]

    // Draw connections as curved lines
    const linkGroup = mainGroup.append('g').attr('class', 'links')
    const linkElements: d3.Selection<SVGPathElement, unknown, null, undefined>[] = []

    // Particle group for animations (declared before use in link handlers)
    const particleGroup = svg.append('g').attr('class', 'particles')

    connections.forEach(([i, j], idx) => {
      const source = nodes[i]
      const target = nodes[j]

      // Create curved path
      const midX = (source.x + target.x) / 2 + (Math.random() - 0.5) * 20
      const midY = (source.y + target.y) / 2 + (Math.random() - 0.5) * 20

      const link = linkGroup
        .append('path')
        .attr('d', `M ${source.x} ${source.y} Q ${midX} ${midY} ${target.x} ${target.y}`)
        .attr('fill', 'none')
        .attr('stroke', darkColor)
        .attr('stroke-width', 2.5)
        .attr('stroke-linecap', 'round')
        .attr('opacity', 0)

      // 入场动画
      link
        .transition()
        .duration(600)
        .delay(300 + idx * 50)
        .ease(d3.easeQuadOut)
        .attr('opacity', 0.2)

      link.style('cursor', 'pointer').on('click', function (event: MouseEvent) {
        event.stopPropagation()

        // Highlight line
        d3.select(this)
          .transition()
          .duration(100)
          .attr('stroke', accentColor)
          .attr('opacity', 0.8)
          .attr('stroke-width', 4)
          .transition()
          .duration(600)
          .attr('stroke', darkColor)
          .attr('opacity', 0.2)
          .attr('stroke-width', 2.5)

        // Fast particle along the line
        for (let p = 0; p < 3; p++) {
          const particle = particleGroup
            .append('circle')
            .attr('cx', source.x)
            .attr('cy', source.y)
            .attr('r', 5 - p)
            .attr('fill', accentColor)
            .attr('opacity', 0)

          particle
            .transition()
            .delay(p * 60)
            .duration(0)
            .attr('opacity', 0.9 - p * 0.2)
            .transition()
            .duration(400)
            .ease(d3.easeQuadOut)
            .attr('cx', target.x)
            .attr('cy', target.y)
            .attr('r', 2)
            .transition()
            .duration(200)
            .attr('opacity', 0)
            .remove()
        }
      })

      linkElements.push(link)
    })

    // Store D3 selection for updating later
    linkElementsSelect = linkGroup.selectAll('path')

    // Connection line pulse animation
    function pulseConnections() {
      linkElements.forEach((link, idx) => {
        const delay = idx * 150 + Math.random() * 200
        link
          .transition()
          .delay(delay)
          .duration(800)
          .attr('opacity', 0.45)
          .attr('stroke-width', 3)
          .transition()
          .duration(1000)
          .attr('opacity', 0.2)
          .attr('stroke-width', 2.5)
      })
    }

    // Draw nodes
    const nodeGroup = mainGroup.append('g').attr('class', 'nodes')

    const nodeElements = nodeGroup
      .selectAll<SVGCircleElement, NodeDatum>('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('cx', (d) => d.x)
      .attr('cy', (d) => d.y)
      .attr('r', 0)
      .attr('fill', (d) => (d.type === 'output' ? accentColor : darkColor))
      .attr('opacity', (d) => (d.type === 'hidden' ? 0.4 : 0.85))
      .style('cursor', 'pointer')

    // Store for update
    nodeElementsSelect = nodeElements

    // 节点入场动画
    nodeElements
      .transition()
      .duration(800)
      .delay((d, i) => i * 80)
      .ease(d3.easeBackOut.overshoot(1.5))
      .attr('r', (d) => d.r)

    nodeElements.on('click', function (event: MouseEvent, d) {
      event.stopPropagation()

      // Ripple effect
      const ripple = svg
        .append('circle')
        .attr('cx', d.x)
        .attr('cy', d.y)
        .attr('r', d.r)
        .attr('fill', 'none')
        .attr('stroke', d.type === 'output' ? accentColor : darkColor)
        .attr('stroke-width', 3)
        .attr('opacity', 0.8)

      ripple.transition().duration(600).attr('r', d.r * 4).attr('opacity', 0).remove()

      // Radiate particles
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2
        const particle = particleGroup
          .append('circle')
          .attr('cx', d.x)
          .attr('cy', d.y)
          .attr('r', 3)
          .attr('fill', accentColor)
          .attr('opacity', 0.9)

        particle
          .transition()
          .duration(500)
          .attr('cx', d.x + Math.cos(angle) * 50)
          .attr('cy', d.y + Math.sin(angle) * 50)
          .attr('r', 1)
          .attr('opacity', 0)
          .remove()
      }

      // Node pulse
      d3.select(this)
        .transition()
        .duration(150)
        .attr('r', d.r * 1.5)
        .transition()
        .duration(300)
        .attr('r', d.r)
    })

    // Click on empty space - all nodes pulse
    svg.on('click', function () {
      nodeElements.each(function (d) {
        const node = d3.select(this)
        const baseOpacity = d.type === 'hidden' ? 0.4 : 0.85

        node
          .transition()
          .duration(200)
          .attr('r', d.r * 1.4)
          .attr('opacity', 1)
          .transition()
          .duration(400)
          .attr('r', d.r)
          .attr('opacity', baseOpacity)
      })

      // Flash all connections
      linkElements.forEach((link) => {
        link
          .transition()
          .duration(200)
          .attr('opacity', 0.5)
          .attr('stroke-width', 4)
          .transition()
          .duration(400)
          .attr('opacity', 0.2)
          .attr('stroke-width', 2.5)
      })
    })

    // Animation: Send organic pulses through network
    function sendPulse() {
      const duration = 1200

      // Randomly select a few connections to animate
      const activeConns = connections.filter(() => Math.random() > 0.6)

      activeConns.forEach(([i, j]) => {
        const source = nodes[i]
        const target = nodes[j]
        const delay = (source.type === 'input' ? 0 : 600) + Math.random() * 400

        // Create flowing particle with trail
        const trailCount = 3
        for (let t = 0; t < trailCount; t++) {
          const trailDelay = delay + t * 80
          const trailOpacity = 0.8 - t * 0.25
          const trailSize = 4 - t * 1

          const particle = particleGroup
            .append('circle')
            .attr('cx', source.x)
            .attr('cy', source.y)
            .attr('r', trailSize)
            .attr('fill', accentColor)
            .attr('opacity', 0)

          particle
            .transition()
            .delay(trailDelay)
            .duration(0)
            .attr('opacity', trailOpacity)
            .transition()
            .duration(duration)
            .ease(d3.easeCubicInOut)
            .attr('cx', target.x)
            .attr('cy', target.y)
            .attr('r', trailSize * 0.5)
            .transition()
            .duration(300)
            .attr('opacity', 0)
            .remove()
        }
      })

      // Pulse input nodes - Layer 1
      nodeElements
        .filter((d) => d.type === 'input')
        .each(function (d, i) {
          d3.select(this)
            .transition()
            .delay(i * 100)
            .duration(250)
            .attr('r', d.r * 1.5)
            .attr('opacity', 1)
            .transition()
            .duration(400)
            .attr('r', d.r)
            .attr('opacity', 0.85)
        })

      // Pulse hidden nodes - Layer 2
      nodeElements
        .filter((d) => d.type === 'hidden')
        .each(function (d, i) {
          d3.select(this)
            .transition()
            .delay(600 + i * 120)
            .duration(300)
            .attr('r', d.r * 1.35)
            .attr('opacity', 0.7)
            .transition()
            .duration(500)
            .attr('r', d.r)
            .attr('opacity', 0.4)
        })

      // Pulse output nodes - Layer 3
      nodeElements
        .filter((d) => d.type === 'output')
        .each(function (d, i) {
          d3.select(this)
            .transition()
            .delay(1300 + i * 150)
            .duration(350)
            .attr('r', d.r * 1.4)
            .attr('opacity', 1)
            .transition()
            .duration(600)
            .attr('r', d.r)
            .attr('opacity', 0.85)
        })
    }

    // Output ripple effect
    function outputRipple() {
      nodes
        .filter((n) => n.type === 'output')
        .forEach((node) => {
          const ripple = svg
            .append('circle')
            .attr('cx', node.x)
            .attr('cy', node.y)
            .attr('r', node.r)
            .attr('fill', 'none')
            .attr('stroke', accentColor)
            .attr('stroke-width', 2)
            .attr('opacity', 0.5)

          ripple
            .transition()
            .duration(1200)
            .ease(d3.easeQuadOut)
            .attr('r', node.r * 3)
            .attr('opacity', 0)
            .remove()
        })
    }

    // Arc breathing animation
    function breatheArcs() {
      arcRadii.forEach((r, i) => {
        svg
          .select(`.arc-${i}`)
          .transition()
          .delay(i * 100)
          .duration(1500)
          .attr('opacity', 0.2 + i * 0.05)
          .transition()
          .duration(1500)
          .attr('opacity', 0.12 + i * 0.03)
      })
    }

    // Hidden nodes breathing animation
    let breathePhase = 0
    function breatheNodes() {
      if (disposed) return
      if (isPageVisible) {
        breathePhase += 0.03
        nodeElements
          .filter((d) => d.type === 'hidden')
          .attr('r', (d) => d.r * (1 + Math.sin(breathePhase) * 0.12))
      }
      requestAnimationFrame(breatheNodes)
    }
    breatheNodes()

    // Gentle sway animation for nodes (rotate around Z axis)
    let swayAngle = 0
    function swayNodes() {
      if (disposed) return
      if (isPageVisible) {
        swayAngle += 0.015
        const angle = Math.sin(swayAngle) * 3 // ±3 degrees
        nodeGroup.attr('transform', `rotate(${angle}, ${cx}, ${cy})`)
        linkGroup.attr('transform', `rotate(${angle}, ${cx}, ${cy})`)
      }
      requestAnimationFrame(swayNodes)
    }
    swayNodes()

    // Arc slow rotation animation - alternating directions
    const arcAngles = arcRadii.map(() => 0)

    function rotateArcs() {
      if (disposed) return
      if (isPageVisible) {
        arcRadii.forEach((r, i) => {
          // 相邻弧线方向交替：奇数正向，偶数逆向
          const direction = i % 2 === 0 ? 1 : -1
          arcAngles[i] += 0.12 * direction
          svg
            .select(`.arc-${i}`)
            .attr('transform', `translate(${cx - 25}, ${cy + 15}) rotate(${arcAngles[i]})`)
        })
      }
      requestAnimationFrame(rotateArcs)
    }
    rotateArcs()

    // Main animation loop
    function animate() {
      if (disposed) return
      if (isPageVisible) {
        sendPulse()
        pulseConnections()
        timeouts.push(setTimeout(outputRipple, 1800))
      }
      timeouts.push(setTimeout(animate, 4000))
      if (isPageVisible) breatheArcs()
    }

    // Start animations
    animate()

    // 3D rotation with mouse interaction
    let rotateX = 0
    let rotateY = 0
    let targetRotateX = 0
    let targetRotateY = 0
    let autoRotate = 0
    let isHovering = false

    // Set up 3D perspective
    container.style.perspective = '800px'

    // Smooth interpolation
    function lerp(current: number, target: number, factor: number) {
      return current + (target - current) * factor
    }

    // Mouse interaction
    const onMouseEnter = () => {
      isHovering = true
    }
    const onMouseLeave = () => {
      isHovering = false
      targetRotateX = 0
      targetRotateY = 0
    }
    const onMouseMove = (e: MouseEvent) => {
      if (!isHovering) return
      const rect = container.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      targetRotateY = x * 25
      targetRotateX = -y * 15
    }
    container.addEventListener('mouseenter', onMouseEnter)
    container.addEventListener('mouseleave', onMouseLeave)
    container.addEventListener('mousemove', onMouseMove)

    // Animation loop
    function animate3D() {
      if (disposed) return
      if (isPageVisible) {
        if (isHovering) {
          rotateX = lerp(rotateX, targetRotateX, 0.1)
          rotateY = lerp(rotateY, targetRotateY, 0.1)
        } else {
          autoRotate += 0.3
          const wobbleY = Math.sin(autoRotate * 0.02) * 6
          const wobbleX = Math.cos(autoRotate * 0.015) * 4
          rotateX = lerp(rotateX, wobbleX, 0.05)
          rotateY = lerp(rotateY, wobbleY, 0.05)
        }
        svg.attr(
          'style',
          `transform: rotateY(${rotateY}deg) rotateX(${rotateX}deg); transform-style: preserve-3d;`,
        )
      }
      requestAnimationFrame(animate3D)
    }
    animate3D()

    return () => {
      disposed = true
      timeouts.forEach(clearTimeout)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      mq.removeEventListener('change', onSystemTheme)
      window.removeEventListener('themeChanged', onThemeChanged)
      container.removeEventListener('mouseenter', onMouseEnter)
      container.removeEventListener('mouseleave', onMouseLeave)
      container.removeEventListener('mousemove', onMouseMove)
      d3.select(container).selectAll('*').interrupt()
      container.innerHTML = ''
    }
  }, [])

  return <div className="illustration-container" id="neural-network" ref={containerRef}></div>
}
