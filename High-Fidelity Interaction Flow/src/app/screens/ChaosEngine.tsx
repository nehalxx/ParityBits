import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Shield, Activity, Zap, User } from 'lucide-react';

// Generate facial landmark points
const generateLandmarks = () => {
  const points = [];
  
  // Face outline and features - same as calibration
  for (let i = 0; i < 17; i++) {
    const angle = Math.PI - (i / 16) * Math.PI;
    points.push({
      x: 50 + Math.cos(angle) * 30,
      y: 30 + Math.sin(angle) * 38,
      baseX: 50 + Math.cos(angle) * 30,
      baseY: 30 + Math.sin(angle) * 38,
    });
  }
  
  for (let i = 0; i < 10; i++) {
    points.push({
      x: 30 + i * 4,
      y: 35,
      baseX: 30 + i * 4,
      baseY: 35,
    });
  }
  
  for (let i = 0; i < 12; i++) {
    const angle = (i / 11) * Math.PI * 2;
    points.push({
      x: 35 + Math.cos(angle) * 4,
      y: 42 + Math.sin(angle) * 2,
      baseX: 35 + Math.cos(angle) * 4,
      baseY: 42 + Math.sin(angle) * 2,
    });
  }
  
  for (let i = 0; i < 12; i++) {
    const angle = (i / 11) * Math.PI * 2;
    points.push({
      x: 65 + Math.cos(angle) * 4,
      y: 42 + Math.sin(angle) * 2,
      baseX: 65 + Math.cos(angle) * 4,
      baseY: 42 + Math.sin(angle) * 2,
    });
  }
  
  for (let i = 0; i < 9; i++) {
    points.push({
      x: 48 + (i % 3) * 2,
      y: 48 + Math.floor(i / 3) * 3,
      baseX: 48 + (i % 3) * 2,
      baseY: 48 + Math.floor(i / 3) * 3,
    });
  }
  
  for (let i = 0; i < 8; i++) {
    const angle = Math.PI + (i / 7) * Math.PI;
    points.push({
      x: 50 + Math.cos(angle) * 10,
      y: 65 + Math.sin(angle) * 5,
      baseX: 50 + Math.cos(angle) * 10,
      baseY: 65 + Math.sin(angle) * 5,
    });
  }
  
  return points;
};

export default function ChaosEngine() {
  const [landmarks] = useState(generateLandmarks());
  const [jitteredLandmarks, setJitteredLandmarks] = useState(landmarks);
  const [defenseActive, setDefenseActive] = useState(false);
  const [identifiersObfuscated, setIdentifiersObfuscated] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Start defense after 1 second
    const activateTimer = setTimeout(() => {
      setDefenseActive(true);
    }, 1000);

    // Counter animation
    const counterInterval = setInterval(() => {
      setIdentifiersObfuscated(prev => {
        if (prev >= 342) return 342;
        return prev + 7;
      });
    }, 50);

    // Navigate to status after demo period
    const navigationTimer = setTimeout(() => {
      navigate('/status');
    }, 8000);

    return () => {
      clearTimeout(activateTimer);
      clearTimeout(navigationTimer);
      clearInterval(counterInterval);
    };
  }, [navigate]);

  // Jitter effect for landmarks
  useEffect(() => {
    if (!defenseActive) return;

    const jitterInterval = setInterval(() => {
      setJitteredLandmarks(prev =>
        prev.map(point => ({
          ...point,
          x: point.baseX + (Math.random() - 0.5) * 4,
          y: point.baseY + (Math.random() - 0.5) * 4,
        }))
      );
    }, 100);

    return () => clearInterval(jitterInterval);
  }, [defenseActive]);

  return (
    <div className="min-h-screen bg-[#0a0f0a] relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <Zap className="w-8 h-8 text-green-400" />
            <h1 className="text-4xl font-bold text-green-400 tracking-wider">
              MOVING TARGET DEFENSE
            </h1>
          </div>
          <p className="text-green-300/60 tracking-wide">
            Real-time biometric obfuscation engine
          </p>
        </motion.div>

        {/* Status Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 flex justify-center gap-6"
        >
          <div className="border border-green-500/30 rounded-lg px-6 py-3 bg-green-950/20 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${defenseActive ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`} />
              <span className="text-green-300 tracking-wide">
                {defenseActive ? 'DEFENSE ACTIVE' : 'INITIALIZING'}
              </span>
            </div>
          </div>
          
          <div className="border border-green-500/30 rounded-lg px-6 py-3 bg-green-950/20 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-green-400" />
              <span className="text-green-300 tracking-wide">
                {identifiersObfuscated} IDENTIFIERS OBFUSCATED
              </span>
            </div>
          </div>
          
          <div className="border border-green-500/30 rounded-lg px-6 py-3 bg-green-950/20 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-green-400" />
              <span className="text-green-300 tracking-wide">
                0.0ms LAG
              </span>
            </div>
          </div>
        </motion.div>

        {/* Split View Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex-1 grid grid-cols-2 gap-6 mb-6"
        >
          {/* Left Side - Raw Feed */}
          <div className="relative border-2 border-blue-500/50 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-950/20 to-transparent backdrop-blur-sm">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 bg-blue-950/80 border-b border-blue-500/50 px-6 py-3 z-10 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" />
                  <span className="text-blue-300 tracking-wider font-semibold">RAW FEED</span>
                </div>
                <span className="text-blue-300/60 text-sm">UNPROTECTED</span>
              </div>
            </div>

            {/* Face Visualization */}
            <div className="absolute inset-0 pt-16 flex items-center justify-center">
              <div className="relative w-full h-full p-8">
                {/* Face Silhouette */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <User className="w-96 h-96 text-blue-500/20" strokeWidth={1} />
                </div>

                {/* Static Landmarks */}
                <svg className="absolute inset-0 w-full h-full">
                  {landmarks.map((point, index) => (
                    <g key={index}>
                      {index > 0 && (
                        <line
                          x1={`${landmarks[index - 1].x}%`}
                          y1={`${landmarks[index - 1].y}%`}
                          x2={`${point.x}%`}
                          y2={`${point.y}%`}
                          stroke="#3b82f6"
                          strokeWidth="1"
                          opacity="0.2"
                        />
                      )}
                      <circle
                        cx={`${point.x}%`}
                        cy={`${point.y}%`}
                        r="3"
                        fill="#3b82f6"
                      />
                    </g>
                  ))}
                </svg>

                {/* Warning Overlay */}
                <motion.div
                  className="absolute inset-0 border-4 border-red-500/50"
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </div>
            </div>

            {/* Vulnerability Warning */}
            <div className="absolute bottom-6 left-6 right-6 bg-red-950/80 border border-red-500/50 rounded-lg px-4 py-3 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="text-red-400 text-xs leading-relaxed">
                  ⚠️ VULNERABLE: Biometric data exposed to tracking algorithms
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Shielded Feed */}
          <div className="relative border-2 border-green-500/50 rounded-2xl overflow-hidden bg-gradient-to-br from-green-950/20 to-transparent backdrop-blur-sm">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 bg-green-950/80 border-b border-green-500/50 px-6 py-3 z-10 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-green-300 tracking-wider font-semibold">SHIELDED FEED</span>
                </div>
                <span className="text-green-300/60 text-sm">PROTECTED</span>
              </div>
            </div>

            {/* Face Visualization with Jitter */}
            <div className="absolute inset-0 pt-16 flex items-center justify-center">
              <div className="relative w-full h-full p-8">
                {/* Face Silhouette */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <User className="w-96 h-96 text-green-500/20" strokeWidth={1} />
                </div>

                {/* Digital Noise Effect */}
                {defenseActive && (
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                      duration: 0.3,
                      repeat: Infinity,
                    }}
                  >
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMTAwdjEwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMiIvPjwvc3ZnPg==')] opacity-20" />
                  </motion.div>
                )}

                {/* Jittered Landmarks */}
                <svg className="absolute inset-0 w-full h-full">
                  {jitteredLandmarks.map((point, index) => {
                    const hue = (index * 360 / jitteredLandmarks.length) % 360;
                    const color = defenseActive ? `hsl(${hue}, 70%, 60%)` : '#22c55e';
                    
                    return (
                      <g key={index}>
                        {index > 0 && (
                          <motion.line
                            x1={`${jitteredLandmarks[index - 1].x}%`}
                            y1={`${jitteredLandmarks[index - 1].y}%`}
                            x2={`${point.x}%`}
                            y2={`${point.y}%`}
                            stroke={color}
                            strokeWidth="1"
                            opacity="0.3"
                          />
                        )}
                        <motion.circle
                          cx={`${point.x}%`}
                          cy={`${point.y}%`}
                          r="3"
                          fill={color}
                          animate={defenseActive ? {
                            scale: [1, 1.3, 1],
                          } : {}}
                          transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            delay: index * 0.01,
                          }}
                        />
                        {defenseActive && (
                          <motion.circle
                            cx={`${point.x}%`}
                            cy={`${point.y}%`}
                            r="3"
                            fill="none"
                            stroke={color}
                            strokeWidth="1"
                            animate={{
                              scale: [1, 2.5],
                              opacity: [0.8, 0],
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              delay: index * 0.01,
                            }}
                          />
                        )}
                      </g>
                    );
                  })}
                </svg>

                {/* Shield Effect */}
                {defenseActive && (
                  <motion.div
                    className="absolute inset-0 border-2 border-green-400/30"
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(34,197,94,0.2)',
                        '0 0 40px rgba(34,197,94,0.4)',
                        '0 0 20px rgba(34,197,94,0.2)',
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                )}
              </div>
            </div>

            {/* Protection Status */}
            <div className="absolute bottom-6 left-6 right-6 bg-green-950/80 border border-green-500/50 rounded-lg px-4 py-3 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-400 flex-shrink-0" />
                <div className="text-green-400 text-xs leading-relaxed">
                  ✓ PROTECTED: Biometric identifiers continuously randomized
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Technical Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-3 gap-4"
        >
          <div className="border border-green-500/30 rounded-lg p-4 bg-green-950/20 backdrop-blur-sm">
            <div className="text-green-300/60 text-xs mb-1 tracking-wide">OBFUSCATION METHOD</div>
            <div className="text-green-300 text-sm font-semibold">Geometric Perturbation</div>
          </div>
          
          <div className="border border-green-500/30 rounded-lg p-4 bg-green-950/20 backdrop-blur-sm">
            <div className="text-green-300/60 text-xs mb-1 tracking-wide">REFRESH RATE</div>
            <div className="text-green-300 text-sm font-semibold">10 updates/second</div>
          </div>
          
          <div className="border border-green-500/30 rounded-lg p-4 bg-green-950/20 backdrop-blur-sm">
            <div className="text-green-300/60 text-xs mb-1 tracking-wide">ATTACK MITIGATION</div>
            <div className="text-green-300 text-sm font-semibold">99.7% Effective</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
