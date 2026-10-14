import React from 'react';

interface RobotSvgProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ExactRobotSvg: React.FC<RobotSvgProps> = ({
  className = '',
  size = 'md',
}) => {
  const maxW = {
    sm: '260px',
    md: '340px',
    lg: '420px',
  }[size];

  return (
    <div
      style={{
        width: '100%',
        maxWidth: maxW,
        margin: '0 auto',
        display: 'block',
      }}
      className={className}
    >
      <svg
        viewBox="0 0 500 500"
        width="100%"
        height="100%"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          filter: 'drop-shadow(0 6px 16px rgba(36, 54, 75, 0.08))',
        }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Elena Galanina haridusrobot Milo"
      >
        {/* Soft ground shadow ellipse */}
        <ellipse cx="250" cy="466" rx="160" ry="10" fill="#E8EDF2" />

        {/* Dotted horizontal blue ground line */}
        <line
          x1="25"
          y1="486"
          x2="475"
          y2="486"
          stroke="#111827"
          strokeWidth="6"
          strokeDasharray="0 22"
          strokeLinecap="round"
        />

        {/* LEFT WHEEL / TANK TREAD */}
        <g>
          <rect x="122" y="322" width="54" height="132" rx="26" fill="#243444" />
          {/* Stitch notches on left & right wheel edges */}
          <g stroke="#16222F" strokeWidth="3.5" strokeLinecap="round">
            <line x1="124" y1="334" x2="116" y2="334" />
            <line x1="124" y1="352" x2="116" y2="352" />
            <line x1="124" y1="370" x2="116" y2="370" />
            <line x1="124" y1="388" x2="116" y2="388" />
            <line x1="124" y1="406" x2="116" y2="406" />
            <line x1="124" y1="424" x2="116" y2="424" />
            <line x1="124" y1="442" x2="116" y2="442" />

            <line x1="174" y1="334" x2="182" y2="334" />
            <line x1="174" y1="352" x2="182" y2="352" />
            <line x1="174" y1="370" x2="182" y2="370" />
            <line x1="174" y1="388" x2="182" y2="388" />
            <line x1="174" y1="406" x2="182" y2="406" />
            <line x1="174" y1="424" x2="182" y2="424" />
            <line x1="174" y1="442" x2="182" y2="442" />
          </g>
        </g>

        {/* RIGHT WHEEL / TANK TREAD */}
        <g>
          <rect x="324" y="322" width="54" height="132" rx="26" fill="#243444" />
          {/* Stitch notches on right wheel edges */}
          <g stroke="#16222F" strokeWidth="3.5" strokeLinecap="round">
            <line x1="326" y1="334" x2="318" y2="334" />
            <line x1="326" y1="352" x2="318" y2="352" />
            <line x1="326" y1="370" x2="318" y2="370" />
            <line x1="326" y1="388" x2="318" y2="388" />
            <line x1="326" y1="406" x2="318" y2="406" />
            <line x1="326" y1="424" x2="318" y2="424" />
            <line x1="326" y1="442" x2="318" y2="442" />

            <line x1="376" y1="334" x2="384" y2="334" />
            <line x1="376" y1="352" x2="384" y2="352" />
            <line x1="376" y1="370" x2="384" y2="370" />
            <line x1="376" y1="388" x2="384" y2="388" />
            <line x1="376" y1="406" x2="384" y2="406" />
            <line x1="376" y1="424" x2="384" y2="424" />
            <line x1="376" y1="442" x2="384" y2="442" />
          </g>
        </g>

        {/* GREEN BOTTOM CHASSIS */}
        <rect x="174" y="410" width="152" height="38" rx="14" fill="#58B887" />

        {/* YELLOW-ORANGE MAIN TORSO BODY */}
        <rect x="154" y="238" width="192" height="172" rx="6" fill="#F4A334" />

        {/* LEFT ORANGE STUDS (3 rows of 2 studs) */}
        <g stroke="#DB871C" strokeWidth="2.5" fill="#F4A334" fillOpacity="0.4">
          <circle cx="172" cy="256" r="9" />
          <circle cx="194" cy="256" r="9" />
          <circle cx="172" cy="290" r="9" />
          <circle cx="194" cy="290" r="9" />
          <circle cx="172" cy="324" r="9" />
          <circle cx="194" cy="324" r="9" />
        </g>

        {/* RIGHT ORANGE STUDS (3 rows of 2 studs) */}
        <g stroke="#DB871C" strokeWidth="2.5" fill="#F4A334" fillOpacity="0.4">
          <circle cx="306" cy="256" r="9" />
          <circle cx="328" cy="256" r="9" />
          <circle cx="306" cy="290" r="9" />
          <circle cx="328" cy="290" r="9" />
          <circle cx="306" cy="324" r="9" />
          <circle cx="328" cy="324" r="9" />
        </g>

        {/* WHITE CENTRAL COLUMN PLATE */}
        <rect x="208" y="238" width="84" height="198" rx="12" fill="#FFFFFF" />

        {/* WHITE PLATE STUDS (4 rows of 3 studs) */}
        <g stroke="#CBD5E1" strokeWidth="2.5" fill="#FFFFFF">
          <circle cx="226" cy="264" r="7" />
          <circle cx="250" cy="264" r="7" />
          <circle cx="274" cy="264" r="7" />

          <circle cx="226" cy="298" r="7" />
          <circle cx="250" cy="298" r="7" />
          <circle cx="274" cy="298" r="7" />

          <circle cx="226" cy="332" r="7" />
          <circle cx="250" cy="332" r="7" />
          <circle cx="274" cy="332" r="7" />

          <circle cx="226" cy="366" r="7" />
          <circle cx="250" cy="366" r="7" />
          <circle cx="274" cy="366" r="7" />
        </g>

        {/* GREEN BUTTON AT BOTTOM OF WHITE PLATE */}
        <rect x="239" y="395" width="22" height="22" rx="4" fill="#4CAF7D" />

        {/* LEFT ARM (Extending downward to the left) */}
        <g>
          <path
            d="M154 238 L94 274"
            stroke="#58B887"
            strokeWidth="15"
            strokeLinecap="round"
          />
          {/* Lime green shovel claw hand */}
          <polygon
            points="44,292 94,264 104,306 72,320"
            fill="#9ED038"
          />
        </g>

        {/* RIGHT ARM (Extending downward to the right) */}
        <g>
          <path
            d="M346 238 L400 355"
            stroke="#58B887"
            strokeWidth="15"
            strokeLinecap="round"
          />
          {/* Lime green shovel claw hand */}
          <polygon
            points="372,378 406,346 444,410 404,394"
            fill="#9ED038"
          />
        </g>

        {/* TEAL COLLAR PLATE */}
        <rect x="134" y="184" width="232" height="54" rx="12" fill="#6CC4CB" />

        {/* ORANGE TRIM LINE ON COLLAR */}
        <rect x="134" y="208" width="232" height="7" fill="#F4A334" />

        {/* TWO BLUE TILES ON COLLAR */}
        <rect x="160" y="190" width="42" height="18" rx="4" fill="#111827" />
        <rect x="298" y="190" width="42" height="18" rx="4" fill="#111827" />

        {/* LIGHT GREY CURVED CONNECTOR */}
        <rect x="212" y="168" width="76" height="42" rx="8" fill="#DCE3E8" />

        {/* TEAL VERTICAL STEM */}
        <rect x="238" y="128" width="24" height="42" fill="#6CC4CB" />

        {/* NAVY CONNECTOR WITH HOLE */}
        <rect x="239" y="94" width="22" height="36" rx="4" fill="#243444" />
        <circle cx="250" cy="112" r="5" fill="#FFFFFF" />

        {/* ORANGE BRIDGE BETWEEN EYES */}
        <rect x="242" y="52" width="16" height="18" rx="3" fill="#D98822" />

        {/* LEFT EYE (GEAR TREAD) */}
        <g>
          {/* Center at (195, 62) */}
          <circle cx="195" cy="62" r="48" fill="#243444" />
          {/* Teeth notched around gear */}
          <g stroke="#243444" strokeWidth="6" strokeLinecap="round">
            <line x1="195" y1="12" x2="195" y2="17" />
            <line x1="195" y1="107" x2="195" y2="112" />
            <line x1="145" y1="62" x2="150" y2="62" />
            <line x1="240" y1="62" x2="245" y2="62" />
            <line x1="160" y1="27" x2="164" y2="31" />
            <line x1="226" y1="93" x2="230" y2="97" />
            <line x1="160" y1="97" x2="164" y2="93" />
            <line x1="226" y1="31" x2="230" y2="27" />
            <line x1="177" y1="17" x2="179" y2="22" />
            <line x1="213" y1="102" x2="211" y2="107" />
            <line x1="177" y1="107" x2="179" y2="102" />
            <line x1="213" y1="22" x2="211" y2="17" />
            <line x1="150" y1="44" x2="155" y2="46" />
            <line x1="235" y1="78" x2="240" y2="80" />
            <line x1="150" y1="80" x2="155" y2="78" />
            <line x1="235" y1="46" x2="240" y2="44" />
          </g>
          {/* White eyeball */}
          <circle cx="195" cy="62" r="34" fill="#FFFFFF" />
          {/* Black pupil */}
          <circle cx="203" cy="60" r="19" fill="#243444" />
          {/* White shine dot */}
          <circle cx="209" cy="53" r="5.5" fill="#FFFFFF" />
        </g>

        {/* RIGHT EYE (GEAR TREAD) */}
        <g>
          {/* Center at (305, 62) */}
          <circle cx="305" cy="62" r="48" fill="#243444" />
          {/* Teeth notched around gear */}
          <g stroke="#243444" strokeWidth="6" strokeLinecap="round">
            <line x1="305" y1="12" x2="305" y2="17" />
            <line x1="305" y1="107" x2="305" y2="112" />
            <line x1="255" y1="62" x2="260" y2="62" />
            <line x1="350" y1="62" x2="355" y2="62" />
            <line x1="270" y1="27" x2="274" y2="31" />
            <line x1="336" y1="93" x2="340" y2="97" />
            <line x1="270" y1="97" x2="274" y2="93" />
            <line x1="336" y1="31" x2="340" y2="27" />
            <line x1="287" y1="17" x2="289" y2="22" />
            <line x1="323" y1="102" x2="321" y2="107" />
            <line x1="287" y1="107" x2="289" y2="102" />
            <line x1="323" y1="22" x2="321" y2="17" />
            <line x1="260" y1="44" x2="265" y2="46" />
            <line x1="345" y1="78" x2="350" y2="80" />
            <line x1="260" y1="80" x2="265" y2="78" />
            <line x1="345" y1="46" x2="350" y2="44" />
          </g>
          {/* White eyeball */}
          <circle cx="305" cy="62" r="34" fill="#FFFFFF" />
          {/* Black pupil */}
          <circle cx="313" cy="60" r="19" fill="#243444" />
          {/* White shine dot */}
          <circle cx="319" cy="53" r="5.5" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
};
