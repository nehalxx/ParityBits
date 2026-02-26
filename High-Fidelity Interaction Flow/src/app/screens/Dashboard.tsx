import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Shield, Activity, Lock } from 'lucide-react';
import dashboardImage from 'figma:asset/f34ca381a54b190c59a896c9b3a2dba9d19c1fa3.png';

export default function Dashboard() {
  const [shieldActive, setShieldActive] = useState(false);
  const navigate = useNavigate();

  const handleActivate = () => {
    setShieldActive(true);
    setTimeout(() => {
      navigate('/calibration');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0a0f0a] relative overflow-hidden">
      {/* Circuit Board Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${dashboardImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Animated Grid Lines */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-green-500/10 to-transparent"
            style={{ top: `${i * 5}%` }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute h-full w-px bg-gradient-to-b from-transparent via-green-500/10 to-transparent"
            style={{ left: `${i * 5}%` }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <Shield className="w-12 h-12 text-green-400" />
            <h1 className="text-5xl font-bold text-green-400 tracking-wider">
              BIOMETRIC SHIELD
            </h1>
          </div>
          <p className="text-green-300/60 text-lg tracking-wide">
            AI-POWERED PRIVACY PROTECTION SYSTEM
          </p>
        </motion.div>

        {/* Main Dashboard Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-5xl"
        >
          <div className="border-2 border-green-500/50 rounded-3xl p-12 bg-gradient-to-br from-green-950/30 to-transparent backdrop-blur-sm shadow-2xl shadow-green-500/20">
            <div className="grid grid-cols-2 gap-12 mb-12">
              {/* Threat Level Indicator */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col items-center justify-center"
              >
                <h3 className="text-green-300 text-xl mb-6 tracking-wide">THREAT LEVEL</h3>
                <div className="relative w-64 h-64">
                  {/* Outer Ring */}
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="128"
                      cy="128"
                      r="110"
                      fill="none"
                      stroke="#1a3d1a"
                      strokeWidth="8"
                    />
                    <motion.circle
                      cx="128"
                      cy="128"
                      r="110"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: "690 690", strokeDashoffset: 690 }}
                      animate={{ strokeDashoffset: 690 - (690 * 0.85) }}
                      transition={{ duration: 2, ease: "easeOut" }}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="50%" stopColor="#f97316" />
                        <stop offset="100%" stopColor="#eab308" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 1 }}
                      className="text-6xl font-bold text-orange-400"
                    >
                      85%
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.2 }}
                      className="text-red-400 text-sm tracking-wider mt-2"
                    >
                      HIGH RISK
                    </motion.div>
                  </div>
                </div>
                <motion.div
                  className="mt-4 text-green-300/60 text-sm"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Active biometric harvesting detected
                </motion.div>
              </motion.div>

              {/* Activate Shield Button */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col items-center justify-center"
              >
                <h3 className="text-green-300 text-xl mb-6 tracking-wide">PRIVACY SHIELD</h3>
                <motion.button
                  onClick={handleActivate}
                  disabled={shieldActive}
                  className="relative w-64 h-64 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={!shieldActive ? { scale: 1.05 } : {}}
                  whileTap={!shieldActive ? { scale: 0.95 } : {}}
                >
                  {/* Button Rings */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-green-400"
                    animate={shieldActive ? {
                      scale: [1, 1.3, 1.6],
                      opacity: [1, 0.5, 0],
                    } : {}}
                    transition={{
                      duration: 1.5,
                      repeat: shieldActive ? Infinity : 0,
                    }}
                  />
                  <motion.div
                    className="absolute inset-4 rounded-full border-2 border-green-400/50"
                    animate={shieldActive ? {
                      rotate: 360,
                    } : {}}
                    transition={{
                      duration: 3,
                      repeat: shieldActive ? Infinity : 0,
                      ease: "linear",
                    }}
                  />
                  <div className="absolute inset-8 rounded-full bg-gradient-to-br from-green-500/30 to-green-700/30 backdrop-blur-sm flex flex-col items-center justify-center">
                    <Shield className="w-16 h-16 text-green-400 mb-3" />
                    <div className="text-green-300 text-lg font-semibold tracking-wider">
                      {shieldActive ? 'INITIALIZING...' : 'ACTIVATE'}
                    </div>
                    <div className="text-green-300 text-lg font-semibold tracking-wider">
                      {shieldActive ? '' : 'SHIELD'}
                    </div>
                  </div>
                </motion.button>
              </motion.div>
            </div>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-4 gap-6"
            >
              <div className="border border-green-500/30 rounded-lg p-6 bg-green-950/20">
                <div className="flex items-center gap-3 mb-2">
                  <Lock className="w-5 h-5 text-green-400" />
                  <div className="text-green-300/60 text-sm tracking-wide">ENCRYPTED CONNECTIONS</div>
                </div>
                <div className="text-3xl font-bold text-green-400">128</div>
              </div>
              
              <div className="border border-green-500/30 rounded-lg p-6 bg-green-950/20">
                <div className="flex items-center gap-3 mb-2">
                  <Activity className="w-5 h-5 text-green-400" />
                  <div className="text-green-300/60 text-sm tracking-wide">ACTIVE</div>
                </div>
                <div className="text-3xl font-bold text-green-400">128</div>
              </div>
              
              <div className="border border-red-500/30 rounded-lg p-6 bg-red-950/20">
                <div className="flex items-center gap-3 mb-2">
                  <Activity className="w-5 h-5 text-red-400" />
                  <div className="text-red-300/60 text-sm tracking-wide">ACTIVE THREATS</div>
                </div>
                <div className="text-3xl font-bold text-red-400">7</div>
              </div>
              
              <div className="border border-green-500/30 rounded-lg p-6 bg-green-950/20">
                <div className="flex items-center gap-3 mb-2">
                  <Activity className="w-5 h-5 text-green-400" />
                  <div className="text-green-300/60 text-sm tracking-wide">LAST SCAN</div>
                </div>
                <div className="text-xl font-bold text-green-400">5 MIN AGO</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-8 text-green-300/40 text-sm tracking-wide"
        >
          MOVING TARGET DEFENSE v2.1 • QUANTUM-RESISTANT ENCRYPTION
        </motion.div>
      </div>
    </div>
  );
}
