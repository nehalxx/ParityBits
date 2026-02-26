import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Scan, User } from 'lucide-react';

// Generate 68 facial landmark points in a face-like pattern
const generateFacialLandmarks = () => {
  const points = [];
  
  // Jaw outline (17 points)
  for (let i = 0; i < 17; i++) {
    const angle = Math.PI - (i / 16) * Math.PI;
    points.push({
      x: 50 + Math.cos(angle) * 35,
      y: 25 + Math.sin(angle) * 45,
      region: 'jaw'
    });
  }
  
  // Left eyebrow (5 points)
  for (let i = 0; i < 5; i++) {
    points.push({
      x: 30 + i * 3,
      y: 32,
      region: 'eyebrow'
    });
  }
  
  // Right eyebrow (5 points)
  for (let i = 0; i < 5; i++) {
    points.push({
      x: 58 + i * 3,
      y: 32,
      region: 'eyebrow'
    });
  }
  
  // Left eye (6 points)
  for (let i = 0; i < 6; i++) {
    const angle = (i / 5) * Math.PI * 2;
    points.push({
      x: 35 + Math.cos(angle) * 4,
      y: 40 + Math.sin(angle) * 2,
      region: 'eye'
    });
  }
  
  // Right eye (6 points)
  for (let i = 0; i < 6; i++) {
    const angle = (i / 5) * Math.PI * 2;
    points.push({
      x: 65 + Math.cos(angle) * 4,
      y: 40 + Math.sin(angle) * 2,
      region: 'eye'
    });
  }
  
  // Nose (9 points)
  for (let i = 0; i < 4; i++) {
    points.push({
      x: 50,
      y: 42 + i * 4,
      region: 'nose'
    });
  }
  for (let i = 0; i < 5; i++) {
    points.push({
      x: 44 + i * 3,
      y: 54,
      region: 'nose'
    });
  }
  
  // Mouth outer (12 points)
  for (let i = 0; i < 12; i++) {
    const angle = Math.PI + (i / 11) * Math.PI;
    points.push({
      x: 50 + Math.cos(angle) * 12,
      y: 62 + Math.sin(angle) * 6,
      region: 'mouth'
    });
  }
  
  // Mouth inner (8 points)
  for (let i = 0; i < 8; i++) {
    const angle = Math.PI + (i / 7) * Math.PI;
    points.push({
      x: 50 + Math.cos(angle) * 10,
      y: 62 + Math.sin(angle) * 4,
      region: 'mouth'
    });
  }
  
  return points;
};

export default function Calibration() {
  const [progress, setProgress] = useState(0);
  const [visiblePoints, setVisiblePoints] = useState(0);
  const [scanLine, setScanLine] = useState(0);
  const navigate = useNavigate();
  const landmarks = generateFacialLandmarks();

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => navigate('/chaos-engine'), 500);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    // Show landmarks progressively
    const landmarkInterval = setInterval(() => {
      setVisiblePoints(prev => {
        if (prev >= 68) {
          clearInterval(landmarkInterval);
          return 68;
        }
        return prev + 1;
      });
    }, 70);

    // Scanning line animation
    const scanInterval = setInterval(() => {
      setScanLine(prev => (prev + 2) % 100);
    }, 20);

    return () => {
      clearInterval(progressInterval);
      clearInterval(landmarkInterval);
      clearInterval(scanInterval);
    };
  }, [navigate]);

  const getRegionColor = (region: string) => {
    const colors = {
      jaw: '#22c55e',
      eyebrow: '#3b82f6',
      eye: '#a855f7',
      nose: '#f59e0b',
      mouth: '#ec4899',
    };
    return colors[region as keyof typeof colors] || '#22c55e';
  };

  return (
    <div className="min-h-screen bg-[#0a0f0a] relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <Scan className="w-8 h-8 text-green-400" />
            <h1 className="text-4xl font-bold text-green-400 tracking-wider">
              FACIAL CALIBRATION
            </h1>
          </div>
          <p className="text-green-300/60 tracking-wide">
            Detecting biometric landmarks for defense initialization
          </p>
        </motion.div>

        {/* Main Scan Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Face Container */}
          <div className="relative w-[600px] h-[700px] border-2 border-green-500/50 rounded-2xl bg-gradient-to-br from-green-950/20 to-transparent backdrop-blur-sm">
            {/* Face Silhouette */}
            <div className="absolute inset-0 flex items-center justify-center">
              <User className="w-96 h-96 text-green-500/20" strokeWidth={1} />
            </div>

            {/* Corner Brackets */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-green-400" />
            <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-green-400" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-green-400" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-green-400" />

            {/* Scanning Line */}
            <motion.div
              className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent shadow-[0_0_20px_rgba(34,197,94,0.8)]"
              style={{ top: `${scanLine}%` }}
            />

            {/* Facial Landmarks */}
            <svg className="absolute inset-0 w-full h-full">
              {landmarks.slice(0, visiblePoints).map((point, index) => {
                const color = getRegionColor(point.region);
                return (
                  <motion.g key={index}>
                    {/* Connecting lines to previous point in same region */}
                    {index > 0 && landmarks[index - 1].region === point.region && (
                      <motion.line
                        x1={`${landmarks[index - 1].x}%`}
                        y1={`${landmarks[index - 1].y}%`}
                        x2={`${point.x}%`}
                        y2={`${point.y}%`}
                        stroke={color}
                        strokeWidth="1"
                        opacity="0.3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    
                    {/* Point */}
                    <motion.circle
                      cx={`${point.x}%`}
                      cy={`${point.y}%`}
                      r="3"
                      fill={color}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: [0, 1.5, 1],
                        opacity: [0, 1, 1],
                      }}
                      transition={{ duration: 0.5 }}
                    />
                    
                    {/* Pulse Ring */}
                    <motion.circle
                      cx={`${point.x}%`}
                      cy={`${point.y}%`}
                      r="3"
                      fill="none"
                      stroke={color}
                      strokeWidth="1"
                      initial={{ scale: 1, opacity: 0.8 }}
                      animate={{ 
                        scale: [1, 2, 1],
                        opacity: [0.8, 0, 0.8],
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.02,
                      }}
                    />
                  </motion.g>
                );
              })}
            </svg>

            {/* Landmark Counter */}
            <motion.div
              className="absolute top-8 left-1/2 -translate-x-1/2 bg-green-950/80 border border-green-500/50 rounded-lg px-6 py-3 backdrop-blur-sm"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">
                  {visiblePoints} / 68
                </div>
                <div className="text-xs text-green-300/60 tracking-wider">
                  LANDMARKS DETECTED
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-3xl mt-8"
        >
          <div className="mb-3 flex justify-between items-center">
            <span className="text-green-300 tracking-wide">CALIBRATION PROGRESS</span>
            <span className="text-green-400 font-bold">{progress}%</span>
          </div>
          <div className="h-3 bg-green-950/30 border border-green-500/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-600 to-green-400 shadow-[0_0_20px_rgba(34,197,94,0.5)]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          {/* Status Messages */}
          <motion.div
            className="mt-4 text-center text-green-300/60 text-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {progress < 30 && "Initializing facial recognition matrix..."}
            {progress >= 30 && progress < 60 && "Mapping biometric data points..."}
            {progress >= 60 && progress < 90 && "Computing geometric variations..."}
            {progress >= 90 && "Calibration complete. Initializing defense system..."}
          </motion.div>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 flex gap-6 text-sm"
        >
          {[
            { region: 'Jaw', color: '#22c55e' },
            { region: 'Eyebrow', color: '#3b82f6' },
            { region: 'Eye', color: '#a855f7' },
            { region: 'Nose', color: '#f59e0b' },
            { region: 'Mouth', color: '#ec4899' },
          ].map(({ region, color }) => (
            <div key={region} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
              />
              <span className="text-green-300/60">{region}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
