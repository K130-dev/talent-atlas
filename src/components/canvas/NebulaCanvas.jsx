import { useEffect, useRef } from 'react';

/**
 * @typedef {Object} TalentProfile
 * @property {string} id
 * @property {string} name
 * @property {string} level
 * @property {string} role
 * @property {string[]} skills
 * @property {number} connections
 * @property {string} location
 * @property {string} status
 */

/**
 * @typedef {Object} NebulaProps
 * @property {((profile: TalentProfile) => void)=} onTalentClick
 * @property {((profile: TalentProfile|null) => void)=} onTalentHover
 * @property {readonly TalentProfile[]=} employees 传入 mock 员工列表时，节点与真实人才数据绑定，点击打开详情
 */

/**
 * @typedef {Object} Particle
 * @property {number} angle
 * @property {number} radius
 * @property {number} yOffset
 * @property {number} size
 * @property {number} speed
 * @property {boolean} isMajorNode
 * @property {string} label
 * @property {boolean} [alwaysShowLabel]
 * @property {number} hue
 * @property {TalentProfile} profile
 * @property {number} uid 粒子唯一 id，悬停高亮不能与 employee.id 混用（多人共用一个员工时）
 * @property {number} [x3d]
 * @property {number} [y3d]
 * @property {number} [z3d]
 */

export default function NebulaCanvas({ onTalentClick, onTalentHover, employees }) {
  const canvasRef = useRef(null);
  const onTalentClickRef = useRef(onTalentClick);
  const onTalentHoverRef = useRef(onTalentHover);
  const scrollYRef = useRef(0);

  useEffect(() => {
    onTalentClickRef.current = onTalentClick;
    onTalentHoverRef.current = onTalentHover;
  }, [onTalentClick, onTalentHover]);

  useEffect(() => {
    const onScroll = () => { scrollYRef.current = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);

    /** @type {Particle[]} */
    const particles = [];
    const talents = [
      "AI 架构师", "全栈工程师", "首席技术官", "数据科学家",
      "产品总监", "Web3 研究员", "高级 UI/UX 设计师", "算法工程师",
      "大模型专家", "量化研究员", "安全工程师", "云原生架构师"
    ];

    const employeePool = employees && employees.length > 0 ? employees : null;

    const numParticles = Math.min(800, Math.floor((width * height) / 2000));
    for (let i = 0; i < numParticles; i++) {
        const isMajor = Math.random() > 0.85;
        const roleName = talents[Math.floor(Math.random() * talents.length)];
        /** @type {TalentProfile} */
        const profile = employeePool
          ? { ...employeePool[i % employeePool.length] }
          : {
             id: Math.random().toString(36).substring(7),
             name: ["Alex Chen", "Sarah Miller", "Wang Wei", "Elena Russo", "Liam Wright", "Sofia Garcia", "Jordan Lee", "David Kim", "Yuki Tanaka", "Aisha Patel", "Wei Zhang", "Michael Chang", "Emily Davis"][Math.floor(Math.random() * 13)],
             level: ["7 级", "8 级", "9 级", "P7", "P8", "T3.1"][Math.floor(Math.random() * 6)],
             role: roleName,
             skills: [
                 ["React", "Node.js", "TypeScript", "GraphQL"],
                 ["PyTorch", "TensorFlow", "CUDA", "Python"],
                 ["UI/UX", "WebGL", "Figma", "Three.js"],
                 ["Rust", "Go", "Solidity", "Cryptography"]
             ][Math.floor(Math.random() * 4)],
             connections: Math.floor(Math.random() * 300) + 50,
             status: "Active Search",
             location: ["San Francisco, CA", "New York, NY", "London, UK", "Singapore", "Remote"][Math.floor(Math.random() * 5)]
        };

        const radius = Math.random() * 1200;

        particles.push({
            uid: i,
            angle: Math.random() * Math.PI * 2,
            radius: radius,
            yOffset: (Math.random() - 0.5) * (20000 / (radius + 50)),
            size: isMajor ? Math.random() * 2 + 1.5 : Math.random() * 1.5 + 0.5,
            speed: (Math.random() * 0.0015 + 0.0005) * (300 / (radius + 50)),
            isMajorNode: isMajor,
            label: profile.name,
            alwaysShowLabel: isMajor && Math.random() > 0.98,
            profile: profile,
            hue: [258, 189, 330][Math.floor(Math.random() * 3)],
        });
    }

    let parallaxX = 0;
    let parallaxZ = 0;
    let baseRotX = 0.6;
    let baseRotZ = 0.0;

    let isDragging = false;
    let hasDragged = false;
    let lastClientX = 0;
    let lastClientY = 0;

    /** @type {Array<{x: number, y: number, hitRadius: number, profile: TalentProfile, uid: number}>} */
    let activeNodes = [];
    /** @type {number|null} 当前悬停的粒子 uid（勿用 employee.id，否则同名同人会全部高亮） */
    let lastHoveredUid = null;

    const handleCanvasClick = (e) => {
        if (hasDragged) return;
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        for (let i = 0; i < activeNodes.length; i++) {
            const node = activeNodes[i];
            const dx = mx - node.x;
            const dy = my - node.y;
            if (dx * dx + dy * dy < node.hitRadius * node.hitRadius) {
                onTalentClickRef.current?.(node.profile);
                break;
            }
        }
    };
    canvas.addEventListener('click', handleCanvasClick);

    const handleMouseDown = (e) => {
        isDragging = true;
        hasDragged = false;
        lastClientX = e.clientX;
        lastClientY = e.clientY;
        canvas.style.cursor = 'grabbing';
    };
    canvas.addEventListener('mousedown', handleMouseDown);

    const handleMouseUpGlobal = () => {
        isDragging = false;
        if (canvas) canvas.style.cursor = 'grab';
    };
    window.addEventListener('mouseup', handleMouseUpGlobal);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      if (isDragging) {
          const dx = e.clientX - lastClientX;
          const dy = e.clientY - lastClientY;
          if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasDragged = true;

          baseRotZ += dx * 0.004;
          baseRotX -= dy * 0.004;
          baseRotX = Math.max(-0.2, Math.min(1.5, baseRotX));

          lastClientX = e.clientX;
          lastClientY = e.clientY;
      } else {
          parallaxZ = ((e.clientX - width / 2) / width) * 0.2;
          parallaxX = ((e.clientY - height / 2) / height) * 0.2;
      }

      let hovered = false;
      let newHoveredProfile = null;
      let newHoveredUid = null;
      for (let i = activeNodes.length - 1; i >= 0; i--) {
          const node = activeNodes[i];
          const dx = mx - node.x;
          const dy = my - node.y;
          if (dx * dx + dy * dy < node.hitRadius * node.hitRadius) {
              hovered = true;
              newHoveredProfile = node.profile;
              newHoveredUid = node.uid;
              break;
          }
      }

      if (newHoveredUid !== lastHoveredUid) {
          lastHoveredUid = newHoveredUid;
          onTalentHoverRef.current?.(newHoveredProfile);
      }

      if (!isDragging) {
          canvas.style.cursor = hovered ? 'pointer' : 'grab';
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    let rotX = 0.6;
    let rotZ = 0;
    const fov = 700;
    let animationFrame;

    const draw = () => {
      ctx.fillStyle = 'rgba(248, 250, 252, 0.4)';
      ctx.fillRect(0, 0, width, height);

      const scrollOffset = scrollYRef.current;
      const heightFactor = Math.min(1, scrollOffset / height);

      const targetRotX = baseRotX + parallaxX;
      const targetRotZ = baseRotZ + parallaxZ;
      const currentTargetRotX = targetRotX - heightFactor * 0.4;

      rotX += (currentTargetRotX - rotX) * 0.08;
      rotZ += (targetRotZ - rotZ) * 0.08;

      const cx = width / 2;
      const cy = height / 2 + 250 - scrollOffset * 0.7;

      particles.forEach(p => {
        p.angle += p.speed;

        const x = Math.cos(p.angle) * p.radius;
        const z = Math.sin(p.angle) * p.radius;
        const y = p.yOffset;

        const x1 = x * Math.cos(rotZ) - y * Math.sin(rotZ);
        const y1 = x * Math.sin(rotZ) + y * Math.cos(rotZ);

        const y2 = y1 * Math.cos(rotX) - z * Math.sin(rotX);
        const z2 = y1 * Math.sin(rotX) + z * Math.cos(rotX);

        p.x3d = x1;
        p.y3d = y2;
        p.z3d = z2;
      });

      particles.sort((a, b) => (b.z3d || 0) - (a.z3d || 0));

      /** @type {Array<{x: number, y: number, alpha: number, z: number, color: string}>} */
      const activeMajorNodes = [];
      activeNodes = [];
      /** 真实员工数据下，同一姓名只画一次「自动露出」的标签，避免满屏重名 */
      const drawnNameLabels = employeePool ? new Set() : null;

      particles.forEach(p => {
        const z3d = p.z3d || 0;
        const scale = fov / (fov + z3d + 600);
        if (scale < 0) return;

        const x2d = cx + (p.x3d || 0) * scale;
        const y2d = cy + (p.y3d || 0) * scale;
        const r2d = Math.max(0.1, p.size * scale);

        const alpha = Math.min(1, Math.max(0.05, scale * 1.5 - 0.2));

        const isFocus = p.isMajorNode && scale > 0.5 && z3d > -800;

        ctx.beginPath();
        ctx.arc(x2d, y2d, r2d, 0, Math.PI * 2);

        const lightnessTalent = '55%';
        const lightnessNormal = '65%';
        const color = `hsla(${p.hue}, 80%, ${p.isMajorNode ? lightnessTalent : lightnessNormal}, ${alpha})`;
        ctx.fillStyle = color;

        if (p.isMajorNode) {
            ctx.shadowBlur = isFocus ? 15 : 5;
            ctx.shadowColor = `hsla(${p.hue}, 100%, 60%, ${alpha})`;
        } else {
            ctx.shadowBlur = 0;
        }

        ctx.fill();

        activeNodes.push({
            x: x2d,
            y: y2d,
            hitRadius: p.isMajorNode ? (r2d + 12 * scale) : Math.max(5, r2d + 5 * scale),
            profile: p.profile,
            uid: p.uid
        });

        if (p.isMajorNode) {
            activeMajorNodes.push({x: x2d, y: y2d, alpha, z: z3d, color: `hsla(${p.hue}, 90%, 70%, `});
        }

        const isHovered = p.uid === lastHoveredUid;
        let shouldDrawText = isFocus || p.alwaysShowLabel || isHovered;
        if (employeePool && drawnNameLabels && shouldDrawText && p.label && !isHovered) {
          if (drawnNameLabels.has(p.label)) {
            shouldDrawText = false;
          } else {
            drawnNameLabels.add(p.label);
          }
        }

        if (shouldDrawText) {
            const textAlpha = isHovered ? 1 : (isFocus ? Math.max(0, Math.min(1, (scale - 0.5) * 2)) : Math.min(0.6, Math.max(0, scale * 1.5 - 0.2)));
            if (textAlpha > 0.05 && p.label) {
                ctx.font = `${isFocus || isHovered ? '600' : '300'} ${Math.max(10, 11 * scale)}px "Helvetica Neue", Arial, sans-serif`;
                ctx.fillStyle = `rgba(15, 23, 42, ${textAlpha})`;
                ctx.shadowBlur = 0;
                ctx.fillText(p.label.toUpperCase(), x2d + r2d + 6 + (isFocus ? 2*scale : 0), y2d + 3);
            }
        }

        if (isFocus) {
            const ringAlpha = Math.max(0, Math.min(1, (scale - 0.5) * 2));
            ctx.strokeStyle = `hsla(${p.hue}, 80%, 70%, ${ringAlpha * 0.3})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(x2d, y2d, r2d + 4 * scale, 0, Math.PI * 2);
            ctx.stroke();
        }
      });

      ctx.shadowBlur = 0;
      ctx.lineWidth = 0.6;
      for (let i = 0; i < activeMajorNodes.length; i++) {
        for (let j = i + 1; j < activeMajorNodes.length; j++) {
            const n1 = activeMajorNodes[i];
            const n2 = activeMajorNodes[j];

            if (n1.z < -400 || n2.z < -400) continue;

            const dx = n1.x - n2.x;
            const dy = n1.y - n2.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < 15000) {
                const dist = Math.sqrt(distSq);
                const lineAlpha = (1 - dist / 122) * Math.min(n1.alpha, n2.alpha) * 0.6;
                ctx.strokeStyle = `${n1.color}${lineAlpha})`;
                ctx.beginPath();
                ctx.moveTo(n1.x, n1.y);
                ctx.lineTo(n2.x, n2.y);
                ctx.stroke();
            }
        }
      }

      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUpGlobal);
      canvas.removeEventListener('click', handleCanvasClick);
      canvas.removeEventListener('mousedown', handleMouseDown);
      cancelAnimationFrame(animationFrame);
    };
  }, [employees]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-auto"
      style={{ zIndex: 0 }}
    />
  );
}
