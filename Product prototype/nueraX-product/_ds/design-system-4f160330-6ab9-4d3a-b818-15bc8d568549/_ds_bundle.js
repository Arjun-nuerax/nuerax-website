/* @ds-bundle: {"format":4,"namespace":"NueraXDesignSystem_4f1603","components":[{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"Avatar","sourcePath":"components/chat/ChatBubble.jsx"},{"name":"ChatBubble","sourcePath":"components/chat/ChatBubble.jsx"},{"name":"DonutChart","sourcePath":"components/data-viz/DonutChart.jsx"},{"name":"LineChart","sourcePath":"components/data-viz/LineChart.jsx"},{"name":"Badge","sourcePath":"components/feedback/Badge.jsx"},{"name":"Tag","sourcePath":"components/feedback/Tag.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"},{"name":"StatCard","sourcePath":"components/surfaces/Card.jsx"}],"sourceHashes":{"components/buttons/Button.jsx":"593cf97bd1be","components/chat/ChatBubble.jsx":"7e98fb739e07","components/data-viz/DonutChart.jsx":"5697ec8f399a","components/data-viz/LineChart.jsx":"2126726d1cfc","components/feedback/Badge.jsx":"80e31e9d8a5e","components/feedback/Tag.jsx":"5c186e5d326d","components/forms/Checkbox.jsx":"0b71e9d27b99","components/forms/Input.jsx":"12de4cd1c617","components/forms/Radio.jsx":"707fc161a12f","components/forms/Select.jsx":"90e29bf676f4","components/forms/Switch.jsx":"cd47d183cd75","components/surfaces/Card.jsx":"729187d0270b","ui_kits/student-app/Dashboard.jsx":"050262a0343f","ui_kits/student-app/DoubtSolver.jsx":"acce5947fb8f","ui_kits/student-app/Onboarding.jsx":"3d5b5a448d0e","ui_kits/student-app/Shell.jsx":"ca0ea1ea6018"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.NueraXDesignSystem_4f1603 = window.NueraXDesignSystem_4f1603 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const sizeStyles = {
  sm: {
    padding: '8px 16px',
    fontSize: 12.5,
    borderRadius: 10
  },
  md: {
    padding: '12px 22px',
    fontSize: 14,
    borderRadius: 12
  },
  lg: {
    padding: '14px 26px',
    fontSize: 16,
    borderRadius: 14
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  disabled,
  loading,
  children,
  onClick,
  style,
  ...rest
}) {
  const s = sizeStyles[size] || sizeStyles.md;
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: 'none',
    transition: 'transform .12s,box-shadow .2s,filter .2s,background .2s',
    padding: s.padding,
    fontSize: s.fontSize,
    borderRadius: s.borderRadius,
    opacity: disabled ? 0.45 : 1
  };
  const variants = {
    primary: {
      background: 'var(--grad)',
      color: '#fff',
      boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-sm)'
    },
    secondary: {
      background: hover ? 'rgba(99,102,241,.08)' : 'var(--surface)',
      color: 'var(--purple)',
      border: '1.5px solid var(--purple)'
    },
    ghost: {
      background: hover ? 'rgba(99,102,241,.08)' : 'transparent',
      color: 'var(--purple)'
    },
    icon: {
      background: 'var(--grad)',
      color: '#fff',
      width: 44,
      height: 44,
      padding: 0,
      justifyContent: 'center',
      boxShadow: 'var(--shadow-sm)'
    }
  };
  const transform = active ? 'translateY(1px)' : hover && variant === 'primary' ? 'translateY(-1px)' : 'none';
  const filter = active ? 'brightness(.96)' : hover && variant === 'primary' ? 'brightness(1.06)' : 'none';
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    style: {
      ...base,
      ...variants[variant],
      transform,
      filter,
      ...style
    }
  }, rest), loading && /*#__PURE__*/React.createElement(Spinner, null), !loading && icon && iconPosition === 'left' && icon, variant !== 'icon' && children, !loading && icon && iconPosition === 'right' && icon);
}
function Spinner() {
  return /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round",
    style: {
      animation: 'nx-spin .8s linear infinite'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 12a9 9 0 1 1-6.2-8.5"
  }), /*#__PURE__*/React.createElement("style", null, '@keyframes nx-spin{to{transform:rotate(360deg)}}'));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/chat/ChatBubble.jsx
try { (() => {
function Avatar({
  src,
  size = 40,
  ring = false,
  spin = false,
  online
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: size,
      height: size,
      flexShrink: 0
    }
  }, ring && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: -4,
      borderRadius: '50%',
      background: spin ? 'conic-gradient(from 0deg,#6366F1,#EC4899,#06B6D4,#6366F1)' : 'var(--grad)',
      animation: spin ? 'nx-ring 8s linear infinite' : 'none'
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "",
    style: {
      position: 'absolute',
      inset: ring ? 4 : 0,
      width: size - (ring ? 8 : 0),
      height: size - (ring ? 8 : 0),
      borderRadius: '50%',
      objectFit: 'cover',
      border: '2px solid var(--surface)'
    }
  }), online && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 11,
      height: 11,
      borderRadius: '50%',
      background: '#10B981',
      border: '2px solid var(--surface)'
    }
  }), /*#__PURE__*/React.createElement("style", null, '@keyframes nx-ring{to{transform:rotate(360deg)}}'));
}
function ChatBubble({
  text,
  time,
  isUser,
  avatarSrc
}) {
  if (isUser) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        alignSelf: 'flex-end',
        maxWidth: '76%',
        fontFamily: 'var(--font-body)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '12px 16px',
        borderRadius: '16px 16px 4px 16px',
        background: 'var(--grad)',
        color: '#fff',
        fontSize: 14,
        lineHeight: 1.55
      }
    }, text), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'right',
        fontSize: 11,
        color: 'var(--faint)',
        marginTop: 5
      }
    }, time));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      maxWidth: '82%',
      fontFamily: 'var(--font-body)'
    }
  }, avatarSrc && /*#__PURE__*/React.createElement("img", {
    src: avatarSrc,
    style: {
      width: 30,
      height: 30,
      borderRadius: '50%',
      objectFit: 'cover',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 16px',
      borderRadius: '4px 16px 16px 16px',
      background: 'var(--surface-2)',
      color: 'var(--text)',
      fontSize: 14,
      lineHeight: 1.6,
      whiteSpace: 'pre-wrap'
    }
  }, text), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--faint)',
      marginTop: 5
    }
  }, time)));
}
Object.assign(__ds_scope, { Avatar, ChatBubble });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/chat/ChatBubble.jsx", error: String((e && e.message) || e) }); }

// components/data-viz/DonutChart.jsx
try { (() => {
function DonutChart({
  segments = [],
  size = 130,
  centerLabel,
  centerSub
}) {
  const r = 46,
    C = 2 * Math.PI * r,
    gap = 3;
  const total = segments.reduce((a, b) => a + b.value, 0);
  let acc = 0;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 120 120",
    style: {
      width: size,
      height: size,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "60",
    cy: "60",
    r: r,
    fill: "none",
    stroke: "var(--surface-2)",
    strokeWidth: "14"
  }), segments.map((s, i) => {
    const frac = s.value / total;
    const len = Math.max(frac * C - gap, 2);
    const el = /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: "60",
      cy: "60",
      r: r,
      fill: "none",
      stroke: s.color,
      strokeWidth: "14",
      strokeLinecap: "round",
      strokeDasharray: `${len.toFixed(1)} ${(C - len).toFixed(1)}`,
      strokeDashoffset: (-acc).toFixed(1),
      transform: "rotate(-90 60 60)"
    });
    acc += frac * C;
    return el;
  }), centerLabel && /*#__PURE__*/React.createElement("text", {
    x: "60",
    y: "58",
    textAnchor: "middle",
    fontFamily: "Poppins",
    fontWeight: "700",
    fontSize: "24",
    fill: "var(--ink)"
  }, centerLabel), centerSub && /*#__PURE__*/React.createElement("text", {
    x: "60",
    y: "74",
    textAnchor: "middle",
    fontSize: "10",
    fill: "var(--muted)"
  }, centerSub));
}
Object.assign(__ds_scope, { DonutChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-viz/DonutChart.jsx", error: String((e && e.message) || e) }); }

// components/data-viz/LineChart.jsx
try { (() => {
function LineChart({
  series = [],
  width = 620,
  height = 220
}) {
  const x0 = 30,
    x1 = width - 20,
    y0 = height - 35,
    top = 20;
  const pts = arr => arr.map((v, i) => {
    const x = x0 + (x1 - x0) * i / (arr.length - 1);
    const y = y0 - v / 100 * (y0 - top);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${width} ${height}`,
    style: {
      width: '100%',
      height: 'auto'
    }
  }, /*#__PURE__*/React.createElement("line", {
    x1: x0,
    y1: y0,
    x2: x1,
    y2: y0,
    stroke: "var(--border)"
  }), /*#__PURE__*/React.createElement("line", {
    x1: x0,
    y1: (y0 + top) / 2,
    x2: x1,
    y2: (y0 + top) / 2,
    stroke: "var(--border)",
    strokeDasharray: "4 5"
  }), series.map((s, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, s.area && /*#__PURE__*/React.createElement("polygon", {
    points: `${x0},${y0} ${pts(s.data)} ${x1},${y0}`,
    fill: s.color + '1f'
  }), /*#__PURE__*/React.createElement("polyline", {
    points: pts(s.data),
    fill: "none",
    stroke: s.color,
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))));
}
Object.assign(__ds_scope, { LineChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-viz/LineChart.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Badge.jsx
try { (() => {
const semantic = {
  strong: {
    fg: '#059669',
    bg: 'rgba(16,185,129,.13)'
  },
  average: {
    fg: '#B45309',
    bg: 'rgba(245,158,11,.16)'
  },
  weak: {
    fg: '#DB2777',
    bg: 'rgba(236,72,153,.13)'
  },
  improving: {
    fg: '#6366F1',
    bg: 'rgba(99,102,241,.13)'
  },
  focus: {
    fg: '#0891B2',
    bg: 'rgba(6,182,212,.13)'
  }
};
function Badge({
  tone = 'improving',
  gradient,
  children
}) {
  if (gradient) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 14px',
        borderRadius: 999,
        fontSize: 13,
        fontWeight: 600,
        color: '#fff',
        background: 'var(--grad)',
        fontFamily: 'var(--font-body)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: '#fff'
      }
    }), children);
  }
  const c = semantic[tone] || semantic.improving;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '6px 14px',
      borderRadius: 999,
      fontSize: 13,
      fontWeight: 600,
      color: c.fg,
      background: c.bg,
      fontFamily: 'var(--font-body)'
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Badge.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tag.jsx
try { (() => {
function Tag({
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '6px 12px',
      borderRadius: 8,
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--text)',
      background: 'var(--surface-2)',
      border: '1px solid var(--border)',
      fontFamily: 'var(--font-body)'
    }
  }, children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  checked,
  onChange,
  label
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      cursor: 'pointer',
      fontFamily: 'var(--font-body)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => onChange && onChange(!checked),
    style: {
      width: 20,
      height: 20,
      borderRadius: 6,
      flexShrink: 0,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: checked ? 'var(--grad)' : 'transparent',
      border: checked ? 'none' : '1.5px solid var(--border-strong)'
    }
  }, checked && /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6L9 17l-5-5"
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      color: 'var(--text)'
    }
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  label,
  error,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", null, label && /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      fontSize: 12.5,
      fontWeight: 600,
      color: 'var(--text)',
      marginBottom: 7,
      fontFamily: 'var(--font-body)'
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({}, rest, {
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: '100%',
      padding: '12px 14px',
      borderRadius: 12,
      fontSize: 14,
      fontFamily: 'var(--font-body)',
      background: 'var(--surface)',
      color: 'var(--ink)',
      outline: 'none',
      boxSizing: 'border-box',
      border: error ? '1px solid var(--pink)' : `1px solid ${focus ? 'var(--purple)' : 'var(--border-strong)'}`,
      boxShadow: error ? '0 0 0 3px rgba(236,72,153,.15)' : focus ? '0 0 0 3px var(--ring)' : 'none',
      transition: 'border .2s,box-shadow .2s'
    }
  })), error && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 12,
      color: 'var(--pink)',
      marginTop: 6,
      fontFamily: 'var(--font-body)'
    }
  }, error));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function Radio({
  checked,
  onChange,
  label
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      cursor: 'pointer',
      fontFamily: 'var(--font-body)'
    },
    onClick: () => onChange && onChange(true)
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: '50%',
      border: '2px solid var(--purple)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, checked && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: '50%',
      background: 'var(--purple)'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      color: 'var(--text)'
    }
  }, label));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Select({
  label,
  options = [],
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", null, label && /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      fontSize: 12.5,
      fontWeight: 600,
      color: 'var(--text)',
      marginBottom: 7,
      fontFamily: 'var(--font-body)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({}, rest, {
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: '100%',
      appearance: 'none',
      padding: '12px 40px 12px 14px',
      borderRadius: 12,
      fontSize: 14,
      fontFamily: 'var(--font-body)',
      background: 'var(--surface)',
      color: 'var(--ink)',
      outline: 'none',
      cursor: 'pointer',
      boxSizing: 'border-box',
      border: `1px solid ${focus ? 'var(--purple)' : 'var(--border-strong)'}`,
      boxShadow: focus ? '0 0 0 3px var(--ring)' : 'none'
    }
  }), options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o
  }, o))), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--muted)",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      position: 'absolute',
      right: 14,
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 9l6 6 6-6"
  }))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  checked,
  onChange,
  label
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: label ? 'space-between' : 'flex-start',
      gap: 12
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      fontWeight: 600,
      color: 'var(--ink)',
      fontFamily: 'var(--font-body)'
    }
  }, label), /*#__PURE__*/React.createElement("button", {
    onClick: () => onChange && onChange(!checked),
    "aria-label": label || 'Toggle',
    "aria-pressed": checked,
    style: {
      width: 48,
      height: 28,
      borderRadius: 999,
      border: 'none',
      cursor: 'pointer',
      position: 'relative',
      background: checked ? 'var(--grad)' : 'var(--border-strong)',
      transition: 'background .2s'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 3,
      left: checked ? 23 : 3,
      width: 22,
      height: 22,
      borderRadius: '50%',
      background: '#fff',
      boxShadow: 'var(--shadow-sm)',
      transition: 'left .2s'
    }
  })));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Card.jsx
try { (() => {
function Card({
  children,
  hoverLift = false,
  style
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => hoverLift && setHover(true),
    onMouseLeave: () => hoverLift && setHover(false),
    style: {
      borderRadius: 20,
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-sm)',
      padding: 24,
      transform: hover ? 'translateY(-4px)' : 'none',
      transition: 'transform .2s,box-shadow .2s',
      fontFamily: 'var(--font-body)',
      boxSizing: 'border-box',
      ...style
    }
  }, children);
}
function StatCard({
  label,
  value,
  delta,
  icon,
  tint
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      borderRadius: 18,
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      boxShadow: 'var(--shadow-sm)',
      fontFamily: 'var(--font-body)',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: 40,
      borderRadius: 11,
      background: tint
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--muted)',
      marginTop: 14
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 30,
      color: 'var(--ink)',
      lineHeight: 1.1,
      marginTop: 2
    }
  }, value), delta && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      marginTop: 8,
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--green)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#10B981",
    strokeWidth: "2.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 17l6-6 4 4 8-8"
  })), delta, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--faint)',
      fontWeight: 400
    }
  }, "vs last week")));
}
Object.assign(__ds_scope, { Card, StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Card.jsx", error: String((e && e.message) || e) }); }

// ui_kits/student-app/Dashboard.jsx
try { (() => {
function Dashboard() {
  const {
    StatCard,
    LineChart,
    DonutChart,
    Badge
  } = window.NueraXDesignSystem_4f1603;
  const stats = [{
    label: 'Mock Tests',
    value: '24',
    delta: '18%',
    tint: 'rgba(99,102,241,.12)',
    color: '#6366F1',
    path: 'M4 20V10M9 20V4M14 20v-7M19 20V8'
  }, {
    label: 'Accuracy',
    value: '78%',
    delta: '8%',
    tint: 'rgba(16,185,129,.12)',
    color: '#10B981',
    path: 'M12 3a9 9 0 1 0 9 9'
  }, {
    label: 'Rank',
    value: '2,345',
    delta: '650',
    tint: 'rgba(236,72,153,.12)',
    color: '#EC4899',
    path: 'M7 4h10v4a5 5 0 0 1-10 0z'
  }, {
    label: 'Study Hours',
    value: '36.5',
    delta: '12%',
    tint: 'rgba(245,158,11,.13)',
    color: '#F59E0B',
    path: 'M12 3a9 9 0 1 0 9 9M12 8v4l3 2'
  }];
  const weak = [{
    name: 'Rotational Motion',
    val: 45,
    sub: 'Physics',
    color: '#EC4899',
    impact: '+310'
  }, {
    name: 'Chemical Bonding',
    val: 48,
    sub: 'Chemistry',
    color: '#EC4899',
    impact: '+310'
  }, {
    name: 'Vector 3D',
    val: 52,
    sub: 'Maths',
    color: '#06B6D4',
    impact: '+215'
  }, {
    name: 'Human Physiology',
    val: 55,
    sub: 'Biology',
    color: '#10B981',
    impact: '+180'
  }];
  return React.createElement('div', {
    style: {
      padding: 28,
      overflow: 'auto',
      flex: 1
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 10,
      marginBottom: 22
    }
  }, React.createElement('div', null, React.createElement('h2', {
    style: {
      fontFamily: 'Poppins',
      fontWeight: 600,
      fontSize: 24,
      color: 'var(--ink)',
      margin: 0
    }
  }, 'Good evening, Arjun \uD83D\uDC4B'), React.createElement('p', {
    style: {
      fontSize: 14,
      color: 'var(--muted)',
      margin: '5px 0 0'
    }
  }, "You're improving steadily — 2 mock tests left this week."))), React.createElement('div', {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 16
    }
  }, stats.map(s => React.createElement(StatCard, {
    key: s.label,
    label: s.label,
    value: s.value,
    delta: s.delta,
    tint: s.tint,
    icon: React.createElement('svg', {
      width: 20,
      height: 20,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: s.color,
      strokeWidth: 1.9,
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, React.createElement('path', {
      d: s.path
    }))
  }))), React.createElement('div', {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.5fr 1fr',
      gap: 16,
      marginTop: 16
    }
  }, React.createElement('div', {
    style: {
      padding: 22,
      borderRadius: 16,
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      boxShadow: 'var(--shadow-sm)'
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8
    }
  }, React.createElement('h4', {
    style: {
      fontFamily: 'Poppins',
      fontWeight: 600,
      fontSize: 15,
      color: 'var(--ink)',
      margin: 0
    }
  }, 'Performance over time'), React.createElement('div', {
    style: {
      display: 'flex',
      gap: 16,
      fontSize: 12
    }
  }, React.createElement('span', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      color: 'var(--muted)'
    }
  }, React.createElement('span', {
    style: {
      width: 9,
      height: 9,
      borderRadius: 2,
      background: '#6366F1'
    }
  }), 'Score'), React.createElement('span', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      color: 'var(--muted)'
    }
  }, React.createElement('span', {
    style: {
      width: 9,
      height: 9,
      borderRadius: 2,
      background: '#06B6D4'
    }
  }), 'Accuracy'))), React.createElement(LineChart, {
    series: [{
      data: [45, 58, 52, 72, 82],
      color: '#6366F1',
      area: true
    }, {
      data: [40, 55, 60, 68, 72],
      color: '#06B6D4'
    }],
    height: 220
  })), React.createElement('div', {
    style: {
      padding: 22,
      borderRadius: 16,
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      boxShadow: 'var(--shadow-sm)'
    }
  }, React.createElement('h4', {
    style: {
      fontFamily: 'Poppins',
      fontWeight: 600,
      fontSize: 15,
      color: 'var(--ink)',
      margin: '0 0 10px'
    }
  }, 'Weak topics'), weak.map(w => React.createElement('div', {
    key: w.name,
    style: {
      marginBottom: 14
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 13,
      marginBottom: 6
    }
  }, React.createElement('span', {
    style: {
      color: 'var(--text)'
    }
  }, w.name), React.createElement('span', {
    style: {
      color: 'var(--muted)',
      fontWeight: 600
    }
  }, w.val + '%')), React.createElement('div', {
    style: {
      height: 7,
      borderRadius: 999,
      background: 'var(--surface-2)',
      overflow: 'hidden'
    }
  }, React.createElement('div', {
    style: {
      height: '100%',
      borderRadius: 999,
      background: 'linear-gradient(90deg,#EC4899,#F59E0B)',
      width: w.val + '%'
    }
  })))))));
}
window.Dashboard = Dashboard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/student-app/Dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/student-app/DoubtSolver.jsx
try { (() => {
function DoubtSolver() {
  const {
    ChatBubble,
    Avatar
  } = window.NueraXDesignSystem_4f1603;
  const [messages, setMessages] = React.useState([{
    text: "Hi Arjun! \uD83D\uDC4B I'm Arjun AI, your study companion. Ask me any doubt, or tap a suggested prompt to begin.",
    time: '11:24 AM',
    isBot: true
  }, {
    text: "Explain Kirchhoff's Voltage Law with an example.",
    time: '11:25 AM',
    isUser: true
  }, {
    text: "Sure! Kirchhoff's Voltage Law (KVL) says the sum of all voltages around any closed loop is zero.\n\nExample: in a loop with a 10V battery and two resistors dropping V\u2081 and V\u2082:\n+10 \u2212 V\u2081 \u2212 V\u2082 = 0  \u27f9  10 = V\u2081 + V\u2082\n\nWant me to solve a numerical on this?",
    time: '11:25 AM',
    isBot: true
  }]);
  const [input, setInput] = React.useState('');
  const [typing, setTyping] = React.useState(false);
  const scrollRef = React.useRef(null);
  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing]);
  function reply(q) {
    const t = q.toLowerCase();
    if (t.includes('kirchhoff') || t.includes('voltage')) return 'KVL: the algebraic sum of voltages around a closed loop is zero.\nFor a 10V source with drops V\u2081, V\u2082: 10 = V\u2081 + V\u2082.';
    if (t.includes('hint')) return "Here's a nudge, not the answer \uD83D\uDE42 — first identify what's conserved in this system. Try it and tell me what you get.";
    if (t.includes('wrong')) return 'Looking at your last mock — most errors cluster in Rotational Motion and Chemical Bonding. Shall I build a 20-min revision set?';
    if (t.includes('similar')) return "Here's a similar one: a 12V battery with three series resistors (2\u03a9, 3\u03a9, 1\u03a9). Find the current, then the drop across each.";
    if (t.includes('summar')) return "In one line: it's about applying conservation laws at the boundary and checking units.";
    return "Great question! Here's how I'd approach it:\n1) Identify the core concept.\n2) Recall the key formula.\n3) Work through it step by step.";
  }
  function send(text) {
    const q = (text != null ? text : input).trim();
    if (!q) return;
    const now = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
    setMessages(m => [...m, {
      text: q,
      time: now,
      isUser: true
    }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMessages(m => [...m, {
        text: reply(q),
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        }),
        isBot: true
      }]);
      setTyping(false);
    }, 900);
  }
  const topics = ['Electric Circuits', 'Thermodynamics', 'Organic Chemistry', 'Vector 3D', 'Maths'];
  const prompts = ['Explain this question step by step', 'Help me with a similar problem', 'Where did I go wrong?', 'Give me a hint, not the answer', 'Summarize this concept'];
  return React.createElement('div', {
    style: {
      padding: 28,
      flex: 1,
      display: 'flex',
      gap: 20,
      overflow: 'auto',
      boxSizing: 'border-box'
    }
  }, React.createElement('div', {
    style: {
      flex: 1,
      borderRadius: 22,
      overflow: 'hidden',
      border: '1px solid var(--border)',
      boxShadow: 'var(--shadow-md)',
      background: 'var(--surface)',
      display: 'flex',
      flexDirection: 'column',
      height: 600
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '16px 22px',
      borderBottom: '1px solid var(--border)'
    }
  }, React.createElement(Avatar, {
    src: '../../assets/arjun-avatar.jpg',
    size: 42,
    online: true
  }), React.createElement('div', null, React.createElement('div', {
    style: {
      fontFamily: 'Poppins',
      fontWeight: 600,
      fontSize: 15,
      color: 'var(--ink)'
    }
  }, 'Arjun AI'), React.createElement('div', {
    style: {
      fontSize: 12,
      color: '#10B981',
      fontWeight: 500
    }
  }, '\u25cf Online'))), React.createElement('div', {
    ref: scrollRef,
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: 22,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, messages.map((m, i) => React.createElement(ChatBubble, {
    key: i,
    text: m.text,
    time: m.time,
    isUser: m.isUser,
    avatarSrc: m.isBot ? '../../assets/arjun-avatar.jpg' : undefined
  })), typing && React.createElement('div', {
    style: {
      display: 'flex',
      gap: 10
    }
  }, React.createElement('img', {
    src: '../../assets/arjun-avatar.jpg',
    style: {
      width: 30,
      height: 30,
      borderRadius: '50%',
      objectFit: 'cover'
    }
  }), React.createElement('div', {
    style: {
      display: 'flex',
      gap: 5,
      padding: '14px 16px',
      borderRadius: '4px 16px 16px 16px',
      background: 'var(--surface-2)'
    }
  }, [0, 1, 2].map(i => React.createElement('span', {
    key: i,
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: 'var(--faint)'
    }
  }))))), React.createElement('div', {
    style: {
      padding: '14px 18px',
      borderTop: '1px solid var(--border)'
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      gap: 8,
      marginBottom: 12,
      flexWrap: 'wrap'
    }
  }, topics.map(t => React.createElement('button', {
    key: t,
    onClick: () => send(t),
    style: {
      padding: '6px 13px',
      borderRadius: 999,
      border: '1px solid var(--border)',
      background: 'var(--surface)',
      color: 'var(--text)',
      fontSize: 12.5,
      fontWeight: 500,
      cursor: 'pointer'
    }
  }, t))), React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '6px 6px 6px 16px',
      border: '1px solid var(--border-strong)',
      borderRadius: 14,
      background: 'var(--surface-2)'
    }
  }, React.createElement('input', {
    type: 'text',
    value: input,
    onChange: e => setInput(e.target.value),
    onKeyDown: e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        send();
      }
    },
    placeholder: 'Ask any doubt…',
    style: {
      flex: 1,
      border: 'none',
      background: 'none',
      outline: 'none',
      fontSize: 14,
      color: 'var(--ink)'
    }
  }), React.createElement('button', {
    onClick: () => send(),
    'aria-label': 'Send',
    style: {
      width: 38,
      height: 38,
      border: 'none',
      borderRadius: 11,
      background: 'var(--grad)',
      color: '#fff',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, React.createElement('svg', {
    width: 17,
    height: 17,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: '#fff',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }, React.createElement('path', {
    d: 'M22 2L11 13M22 2l-7 20-4-9-9-4z'
  })))))), React.createElement('div', {
    style: {
      width: 280,
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, React.createElement('div', {
    style: {
      padding: 20,
      borderRadius: 20,
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      boxShadow: 'var(--shadow-sm)'
    }
  }, React.createElement('h4', {
    style: {
      fontFamily: 'Poppins',
      fontWeight: 600,
      fontSize: 14,
      color: 'var(--ink)',
      margin: '0 0 14px'
    }
  }, 'Suggested prompts'), React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, prompts.map(p => React.createElement('button', {
    key: p,
    onClick: () => send(p),
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
      padding: '11px 14px',
      border: '1px solid var(--border)',
      borderRadius: 12,
      background: 'var(--surface)',
      color: 'var(--text)',
      fontSize: 13,
      textAlign: 'left',
      cursor: 'pointer'
    }
  }, p))))));
}
window.DoubtSolver = DoubtSolver;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/student-app/DoubtSolver.jsx", error: String((e && e.message) || e) }); }

// ui_kits/student-app/Onboarding.jsx
try { (() => {
function PhoneFrame({
  children
}) {
  return React.createElement('div', {
    style: {
      borderRadius: 46,
      background: 'var(--ink)',
      padding: 8,
      boxShadow: 'var(--shadow-lg)',
      width: 340,
      margin: '0 auto'
    }
  }, React.createElement('div', {
    style: {
      borderRadius: 38,
      overflow: 'hidden',
      background: 'var(--bg)',
      height: 660,
      display: 'flex',
      flexDirection: 'column'
    }
  }, children));
}
function StatusBar() {
  return React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 22px 8px',
      color: 'var(--ink)'
    }
  }, React.createElement('span', {
    style: {
      fontSize: 13,
      fontWeight: 700
    }
  }, '9:41'), React.createElement('span', {
    style: {
      fontSize: 11,
      color: 'var(--faint)'
    }
  }, '●●●'));
}
function ProgressDots({
  step,
  total
}) {
  return React.createElement('div', {
    style: {
      display: 'flex',
      gap: 6,
      padding: '8px 22px 0'
    }
  }, Array.from({
    length: total
  }).map((_, i) => React.createElement('div', {
    key: i,
    style: {
      flex: 1,
      height: 4,
      borderRadius: 2,
      background: i < step ? 'var(--grad)' : 'var(--surface-2)'
    }
  })));
}
function Onboarding() {
  const {
    Input,
    Button
  } = window.NueraXDesignSystem_4f1603;
  const [step, setStep] = React.useState(0);
  const [goal, setGoal] = React.useState('JEE Main');
  const steps = ['Sign Up', 'Verify OTP', 'Your Goal', 'Meet Arjun'];
  const screens = [React.createElement(React.Fragment, null, React.createElement(StatusBar), React.createElement(ProgressDots, {
    step: 1,
    total: 4
  }), React.createElement('div', {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '22px 20px'
    }
  }, React.createElement('img', {
    src: '../../assets/nuerax-mark.png',
    style: {
      height: 40,
      width: 'auto'
    }
  }), React.createElement('h3', {
    style: {
      fontFamily: 'Poppins',
      fontWeight: 700,
      fontSize: 23,
      color: 'var(--ink)',
      margin: '18px 0 4px'
    }
  }, 'Create your account'), React.createElement('p', {
    style: {
      fontSize: 13.5,
      color: 'var(--muted)',
      margin: '0 0 20px'
    }
  }, 'Your NEET/JEE rank, simplified.'), React.createElement(Input, {
    label: 'Email',
    placeholder: 'arjun.k@gmail.com'
  }), React.createElement('div', {
    style: {
      height: 12
    }
  }), React.createElement(Input, {
    label: 'Password',
    type: 'password',
    placeholder: '••••••••'
  }), React.createElement('div', {
    style: {
      height: 16
    }
  }), React.createElement(Button, {
    variant: 'primary',
    style: {
      width: '100%',
      justifyContent: 'center'
    },
    onClick: () => setStep(1)
  }, 'Continue →'))), React.createElement(React.Fragment, null, React.createElement(StatusBar), React.createElement(ProgressDots, {
    step: 2,
    total: 4
  }), React.createElement('div', {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '22px 20px'
    }
  }, React.createElement('span', {
    style: {
      display: 'inline-flex',
      width: 56,
      height: 56,
      borderRadius: 16,
      background: 'rgba(99,102,241,.12)',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, React.createElement('svg', {
    width: 28,
    height: 28,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: '#6366F1',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }, React.createElement('rect', {
    x: 3,
    y: 5,
    width: 18,
    height: 14,
    rx: 2
  }), React.createElement('path', {
    d: 'M3 7l9 6 9-6'
  }))), React.createElement('h3', {
    style: {
      fontFamily: 'Poppins',
      fontWeight: 700,
      fontSize: 23,
      color: 'var(--ink)',
      margin: '18px 0 4px'
    }
  }, 'Verify your email'), React.createElement('p', {
    style: {
      fontSize: 13.5,
      color: 'var(--muted)',
      margin: '0 0 24px',
      lineHeight: 1.5
    }
  }, 'We sent a 6-digit code to ', React.createElement('b', {
    style: {
      color: 'var(--text)'
    }
  }, 'arjun.k@gmail.com')), React.createElement('div', {
    style: {
      display: 'flex',
      gap: 9
    }
  }, ['4', '1', '7', '', '', ''].map((d, i) => React.createElement('div', {
    key: i,
    style: {
      flex: 1,
      aspectRatio: '1',
      borderRadius: 13,
      border: i < 3 ? '1.5px solid var(--purple)' : '1.5px solid var(--border-strong)',
      background: 'var(--surface)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Poppins',
      fontWeight: 700,
      fontSize: 22,
      color: 'var(--ink)'
    }
  }, d))), React.createElement('div', {
    style: {
      height: 20
    }
  }), React.createElement(Button, {
    variant: 'primary',
    style: {
      width: '100%',
      justifyContent: 'center'
    },
    onClick: () => setStep(2)
  }, 'Verify & continue →'))), React.createElement(React.Fragment, null, React.createElement(StatusBar), React.createElement(ProgressDots, {
    step: 3,
    total: 4
  }), React.createElement('div', {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '22px 20px'
    }
  }, React.createElement('h3', {
    style: {
      fontFamily: 'Poppins',
      fontWeight: 700,
      fontSize: 23,
      color: 'var(--ink)',
      margin: '0 0 4px'
    }
  }, "What's your goal?"), React.createElement('p', {
    style: {
      fontSize: 13.5,
      color: 'var(--muted)',
      margin: '0 0 22px'
    }
  }, 'Arjun tailors everything to your exam.'), React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, [['NEET', 'Medical · PCB', '#10B981'], ['JEE Main', 'Engineering · PCM', '#6366F1'], ['JEE Advanced', 'IIT · PCM', '#7C3AED']].map(([name, sub, color]) => {
    const on = goal === name;
    return React.createElement('div', {
      key: name,
      onClick: () => setGoal(name),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: 18,
        borderRadius: 18,
        border: on ? '2px solid var(--purple)' : '1.5px solid var(--border-strong)',
        background: on ? 'rgba(99,102,241,.06)' : 'var(--surface)',
        cursor: 'pointer'
      }
    }, React.createElement('span', {
      style: {
        display: 'inline-flex',
        width: 44,
        height: 44,
        borderRadius: 13,
        background: on ? 'var(--grad)' : color + '20',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }
    }), React.createElement('div', {
      style: {
        flex: 1
      }
    }, React.createElement('div', {
      style: {
        fontFamily: 'Poppins',
        fontWeight: 600,
        fontSize: 16,
        color: 'var(--ink)'
      }
    }, name), React.createElement('div', {
      style: {
        fontSize: 12,
        color: 'var(--muted)'
      }
    }, sub)));
  })), React.createElement('div', {
    style: {
      height: 20
    }
  }), React.createElement(Button, {
    variant: 'primary',
    style: {
      width: '100%',
      justifyContent: 'center'
    },
    onClick: () => setStep(3)
  }, 'Continue →'))), React.createElement(React.Fragment, null, React.createElement(StatusBar), React.createElement('div', {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '24px 22px',
      textAlign: 'center'
    }
  }, React.createElement('div', {
    style: {
      position: 'relative',
      width: 130,
      height: 130,
      margin: '8px auto 0'
    }
  }, React.createElement('div', {
    style: {
      position: 'absolute',
      inset: -4,
      borderRadius: '50%',
      background: 'conic-gradient(from 0deg,#6366F1,#EC4899,#06B6D4,#6366F1)'
    }
  }), React.createElement('img', {
    src: '../../assets/arjun-avatar.jpg',
    style: {
      position: 'absolute',
      inset: 4,
      width: 122,
      height: 122,
      borderRadius: '50%',
      objectFit: 'cover',
      border: '3px solid var(--bg)'
    }
  })), React.createElement('h3', {
    style: {
      fontFamily: 'Poppins',
      fontWeight: 700,
      fontSize: 23,
      color: 'var(--ink)',
      margin: '20px 0 4px'
    }
  }, 'Meet Arjun AI'), React.createElement('p', {
    style: {
      fontSize: 13.5,
      color: 'var(--muted)',
      margin: '0 0 24px',
      lineHeight: 1.5
    }
  }, 'Your AI mentor for ', goal, '. Ready to build your first adaptive week.'), React.createElement(Button, {
    variant: 'primary',
    style: {
      width: '100%',
      justifyContent: 'center'
    },
    onClick: () => setStep(0)
  }, 'Go to dashboard →')))];
  return React.createElement('div', {
    style: {
      padding: '32px 0',
      flex: 1,
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 16
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      gap: 6
    }
  }, steps.map((s, i) => React.createElement('span', {
    key: s,
    style: {
      fontSize: 11,
      fontWeight: 600,
      padding: '6px 12px',
      borderRadius: 999,
      color: i === step ? '#fff' : 'var(--muted)',
      background: i === step ? 'var(--grad)' : 'var(--surface-2)'
    }
  }, s))), React.createElement(PhoneFrame, null, screens[step]));
}
window.Onboarding = Onboarding;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/student-app/Onboarding.jsx", error: String((e && e.message) || e) }); }

// ui_kits/student-app/Shell.jsx
try { (() => {
function Sidebar({
  collapsed,
  onToggle,
  nav,
  active,
  onNav
}) {
  const justify = collapsed ? 'center' : 'flex-start';
  return React.createElement('aside', {
    style: {
      width: collapsed ? 76 : 250,
      flexShrink: 0,
      background: 'var(--surface)',
      borderRight: '1px solid var(--border)',
      padding: '22px 14px',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      transition: 'width .28s cubic-bezier(.4,0,.2,1)',
      boxSizing: 'border-box'
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
      padding: '4px 6px 20px'
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      minWidth: 0
    }
  }, React.createElement('img', {
    src: '../../assets/nuerax-mark.png',
    style: {
      height: 28,
      width: 'auto',
      flexShrink: 0
    }
  }), !collapsed && React.createElement('span', {
    style: {
      fontFamily: 'Poppins',
      fontWeight: 700,
      fontSize: 19,
      color: 'var(--ink)',
      letterSpacing: '-.02em',
      whiteSpace: 'nowrap'
    }
  }, 'nuera', React.createElement('span', {
    style: {
      background: 'var(--grad)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent'
    }
  }, 'X'))), !collapsed && React.createElement('button', {
    onClick: onToggle,
    'aria-label': 'Collapse sidebar',
    style: {
      width: 30,
      height: 30,
      flexShrink: 0,
      border: '1px solid var(--border)',
      borderRadius: 9,
      background: 'var(--surface-2)',
      color: 'var(--muted)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, React.createElement('svg', {
    width: 16,
    height: 16,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }, React.createElement('path', {
    d: 'M15 18l-6-6 6-6'
  })))), collapsed && React.createElement('button', {
    onClick: onToggle,
    'aria-label': 'Expand sidebar',
    style: {
      width: '100%',
      height: 34,
      marginBottom: 8,
      border: '1px solid var(--border)',
      borderRadius: 10,
      background: 'var(--surface-2)',
      color: 'var(--muted)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, React.createElement('svg', {
    width: 16,
    height: 16,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }, React.createElement('path', {
    d: 'M9 18l6-6-6-6'
  }))), React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 3
    }
  }, nav.map(n => {
    const on = n.label === active;
    return React.createElement('button', {
      key: n.label,
      onClick: () => onNav(n.label),
      title: n.label,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 12px',
        border: 'none',
        borderRadius: 11,
        cursor: 'pointer',
        fontFamily: 'Inter',
        fontSize: 14,
        fontWeight: on ? 600 : 500,
        textAlign: 'left',
        background: on ? 'rgba(99,102,241,.12)' : 'transparent',
        color: on ? n.color : 'var(--text)',
        justifyContent: justify
      }
    }, React.createElement('span', {
      style: {
        display: 'flex',
        width: 19,
        justifyContent: 'center',
        flexShrink: 0
      }
    }, n.icon(on ? n.color : 'currentColor')), !collapsed && React.createElement('span', {
      style: {
        whiteSpace: 'nowrap',
        overflow: 'hidden'
      }
    }, n.label));
  })), React.createElement('div', {
    style: {
      marginTop: 'auto',
      padding: 12,
      borderRadius: 14,
      background: 'var(--surface-2)',
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      justifyContent: justify
    }
  }, React.createElement('img', {
    src: '../../assets/arjun-avatar.jpg',
    style: {
      width: 38,
      height: 38,
      borderRadius: '50%',
      objectFit: 'cover',
      flexShrink: 0
    }
  }), !collapsed && React.createElement('div', {
    style: {
      minWidth: 0,
      flex: 1
    }
  }, React.createElement('div', {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--ink)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, 'Arjun Kumar'), React.createElement('div', {
    style: {
      fontSize: 11.5,
      color: 'var(--muted)'
    }
  }, 'Class 12 · JEE 2026'))));
}
const NAV_ICONS = {
  Dashboard: c => React.createElement('svg', {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: c,
    strokeWidth: 1.9,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }, React.createElement('path', {
    d: 'M3 12l9-8 9 8'
  }), React.createElement('path', {
    d: 'M5 10v10h14V10'
  })),
  'Mock Tests': c => React.createElement('svg', {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: c,
    strokeWidth: 1.9,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }, React.createElement('rect', {
    x: 4,
    y: 3,
    width: 14,
    height: 18,
    rx: 2
  }), React.createElement('path', {
    d: 'M8 9l2 2 4-4'
  }), React.createElement('path', {
    d: 'M8 15h6'
  })),
  Analysis: c => React.createElement('svg', {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: c,
    strokeWidth: 1.9,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }, React.createElement('path', {
    d: 'M4 20V10M9 20V4M14 20v-7M19 20V8'
  })),
  'Weak Topics': c => React.createElement('svg', {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: c,
    strokeWidth: 1.9,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }, React.createElement('circle', {
    cx: 12,
    cy: 12,
    r: 9
  }), React.createElement('path', {
    d: 'M12 8v4l3 2'
  })),
  'AI Doubt Solver': c => React.createElement('svg', {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: c,
    strokeWidth: 1.9,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }, React.createElement('path', {
    d: 'M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2z'
  })),
  'Study Plan': c => React.createElement('svg', {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: c,
    strokeWidth: 1.9,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }, React.createElement('rect', {
    x: 3,
    y: 4,
    width: 18,
    height: 17,
    rx: 2
  }), React.createElement('path', {
    d: 'M3 9h18M8 2v4M16 2v4'
  }))
};
function TopBar({
  onUpload
}) {
  return React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      padding: '18px 28px',
      borderBottom: '1px solid var(--border)',
      background: 'var(--surface)'
    }
  }, React.createElement('div', {
    style: {
      position: 'relative',
      width: 'min(340px,50%)'
    }
  }, React.createElement('svg', {
    width: 16,
    height: 16,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'var(--faint)',
    strokeWidth: 2,
    strokeLinecap: 'round',
    style: {
      position: 'absolute',
      left: 13,
      top: '50%',
      transform: 'translateY(-50%)'
    }
  }, React.createElement('circle', {
    cx: 11,
    cy: 11,
    r: 7
  }), React.createElement('path', {
    d: 'M21 21l-4.3-4.3'
  })), React.createElement('input', {
    type: 'text',
    placeholder: 'Search topics, tests, notes…',
    style: {
      width: '100%',
      padding: '10px 14px 10px 38px',
      border: '1px solid var(--border)',
      borderRadius: 11,
      background: 'var(--surface-2)',
      color: 'var(--ink)',
      fontSize: 13.5,
      outline: 'none',
      boxSizing: 'border-box'
    }
  })), React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, React.createElement('button', {
    'aria-label': 'Notifications',
    style: {
      position: 'relative',
      width: 40,
      height: 40,
      borderRadius: 11,
      border: '1px solid var(--border)',
      background: 'var(--surface)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, React.createElement('svg', {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'var(--text)',
    strokeWidth: 1.9,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }, React.createElement('path', {
    d: 'M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9'
  }), React.createElement('path', {
    d: 'M13.7 21a2 2 0 0 1-3.4 0'
  })), React.createElement('span', {
    style: {
      position: 'absolute',
      top: 9,
      right: 10,
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: 'var(--pink)',
      border: '1.5px solid var(--surface)'
    }
  })), React.createElement('button', {
    onClick: onUpload,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '10px 18px',
      border: 'none',
      borderRadius: 11,
      background: 'var(--grad)',
      color: '#fff',
      fontWeight: 600,
      fontSize: 13.5,
      cursor: 'pointer'
    }
  }, React.createElement('svg', {
    width: 15,
    height: 15,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: '#fff',
    strokeWidth: 2.2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }, React.createElement('path', {
    d: 'M12 16V4M8 8l4-4 4 4'
  }), React.createElement('path', {
    d: 'M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2'
  })), 'Upload Mock Test')));
}
window.Sidebar = Sidebar;
window.TopBar = TopBar;
window.NAV_ICONS = NAV_ICONS;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/student-app/Shell.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.ChatBubble = __ds_scope.ChatBubble;

__ds_ns.DonutChart = __ds_scope.DonutChart;

__ds_ns.LineChart = __ds_scope.LineChart;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.StatCard = __ds_scope.StatCard;

})();
