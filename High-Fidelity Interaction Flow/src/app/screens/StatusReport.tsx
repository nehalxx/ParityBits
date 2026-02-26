import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Shield, CheckCircle, Lock, Activity, Zap, Eye, Target, Clock } from 'lucide-react';

export default function StatusReport() {
  const [stats, setStats] = useState({
    identifiersObfuscated: 0,
    threatsBlocked: 0,
    dataPoints: 0,
    uptime: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Animate counters
    const intervals = [
      setInterval(() => {
        setStats(prev => ({
          ...prev,
          identifiersObfuscated: Math.min(prev.identifiersObfuscated + 17, 342),
        }));
      }, 50),
      
      setInterval(() => {
        setStats(prev => ({
          ...prev,
          threatsBlocked: Math.min(prev.threatsBlocked + 1, 27),
        }));
      }, 100),
      
      setInterval(() => {
        setStats(prev => ({
          ...prev,
          dataPoints: Math.min(prev.dataPoints + 3, 68),
        }));
      }, 70),
      
      setInterval(() => {
        setStats(prev => ({
          ...prev,
          uptime: Math.min(prev.uptime + 1, 100),
        }));
      }, 30),
    ];

    return () => intervals.forEach(clearInterval);
  }, []);

  const handleRestart = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0a0f0a] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Success Header */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2,
          }}
          className="mb-12"
        >
          <div className="relative">
            {/* Pulsing Rings */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-green-400"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-green-400"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0.5,
              }}
            />
            
            {/* Shield Icon */}
            <div className="relative w-32 h-32 bg-gradient-to-br from-green-500/30 to-green-700/30 rounded-full flex items-center justify-center border-4 border-green-400 shadow-[0_0_60px_rgba(34,197,94,0.5)]">
              <Shield className="w-16 h-16 text-green-400" fill="currentColor" />
              <CheckCircle className="absolute -bottom-2 -right-2 w-10 h-10 text-green-400 bg-[#0a0f0a] rounded-full" fill="currentColor" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-green-400 tracking-wider mb-3">
            DATA PROTECTED
          </h1>
          <p className="text-green-300/60 text-lg tracking-wide">
            Your biometric identity is now secured
          </p>
        </motion.div>

        {/* Main Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full max-w-6xl mb-8"
        >
          <div className="grid grid-cols-4 gap-6">
            {/* Identifiers Obfuscated */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="border-2 border-green-500/50 rounded-2xl p-8 bg-gradient-to-br from-green-950/30 to-transparent backdrop-blur-sm relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-green-400/5"
                animate={{
                  opacity: [0, 0.2, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              <Target className="w-10 h-10 text-green-400 mb-4" />
              <div className="text-5xl font-bold text-green-400 mb-2">
                {stats.identifiersObfuscated}
              </div>
              <div className="text-green-300/60 text-sm tracking-wider">
                IDENTIFIERS OBFUSCATED
              </div>
            </motion.div>

            {/* Threats Blocked */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="border-2 border-green-500/50 rounded-2xl p-8 bg-gradient-to-br from-green-950/30 to-transparent backdrop-blur-sm relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-green-400/5"
                animate={{
                  opacity: [0, 0.2, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.3,
                }}
              />
              <Lock className="w-10 h-10 text-green-400 mb-4" />
              <div className="text-5xl font-bold text-green-400 mb-2">
                {stats.threatsBlocked}
              </div>
              <div className="text-green-300/60 text-sm tracking-wider">
                THREATS BLOCKED
              </div>
            </motion.div>

            {/* Data Points Protected */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="border-2 border-green-500/50 rounded-2xl p-8 bg-gradient-to-br from-green-950/30 to-transparent backdrop-blur-sm relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-green-400/5"
                animate={{
                  opacity: [0, 0.2, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.6,
                }}
              />
              <Eye className="w-10 h-10 text-green-400 mb-4" />
              <div className="text-5xl font-bold text-green-400 mb-2">
                {stats.dataPoints}
              </div>
              <div className="text-green-300/60 text-sm tracking-wider">
                DATA POINTS PROTECTED
              </div>
            </motion.div>

            {/* System Uptime */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="border-2 border-green-500/50 rounded-2xl p-8 bg-gradient-to-br from-green-950/30 to-transparent backdrop-blur-sm relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-green-400/5"
                animate={{
                  opacity: [0, 0.2, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.9,
                }}
              />
              <Activity className="w-10 h-10 text-green-400 mb-4" />
              <div className="text-5xl font-bold text-green-400 mb-2">
                {stats.uptime}%
              </div>
              <div className="text-green-300/60 text-sm tracking-wider">
                SYSTEM UPTIME
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="w-full max-w-6xl mb-8"
        >
          <div className="border-2 border-green-500/50 rounded-2xl p-8 bg-gradient-to-br from-green-950/30 to-transparent backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-green-400 mb-6 tracking-wide">
              PERFORMANCE METRICS
            </h2>
            
            <div className="grid grid-cols-3 gap-8">
              {/* Processing Lag */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-green-400" />
                    <span className="text-green-300 text-sm tracking-wide">Processing Lag</span>
                  </div>
                  <span className="text-green-400 font-bold">0.0ms</span>
                </div>
                <div className="h-2 bg-green-950/30 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-600 to-green-400"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, delay: 1 }}
                  />
                </div>
                <div className="text-green-300/60 text-xs mt-2">Optimal</div>
              </div>

              {/* Defense Strength */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    <span className="text-green-300 text-sm tracking-wide">Defense Strength</span>
                  </div>
                  <span className="text-green-400 font-bold">99.7%</span>
                </div>
                <div className="h-2 bg-green-950/30 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-600 to-green-400"
                    initial={{ width: 0 }}
                    animate={{ width: "99.7%" }}
                    transition={{ duration: 1.5, delay: 1.2 }}
                  />
                </div>
                <div className="text-green-300/60 text-xs mt-2">Maximum</div>
              </div>

              {/* Randomization Rate */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-green-400" />
                    <span className="text-green-300 text-sm tracking-wide">Randomization Rate</span>
                  </div>
                  <span className="text-green-400 font-bold">10/sec</span>
                </div>
                <div className="h-2 bg-green-950/30 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-600 to-green-400"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, delay: 1.4 }}
                  />
                </div>
                <div className="text-green-300/60 text-xs mt-2">Real-time</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Security Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="w-full max-w-6xl mb-8"
        >
          <div className="grid grid-cols-3 gap-6">
            <div className="border border-green-500/30 rounded-xl p-6 bg-green-950/20 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-green-300 font-semibold mb-1">Geometric Perturbation</h3>
                  <p className="text-green-300/60 text-sm">Facial landmarks continuously randomized</p>
                </div>
              </div>
            </div>

            <div className="border border-green-500/30 rounded-xl p-6 bg-green-950/20 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-green-300 font-semibold mb-1">Moving Target Defense</h3>
                  <p className="text-green-300/60 text-sm">AI tracking algorithms confused</p>
                </div>
              </div>
            </div>

            <div className="border border-green-500/30 rounded-xl p-6 bg-green-950/20 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-green-300 font-semibold mb-1">Zero Latency</h3>
                  <p className="text-green-300/60 text-sm">Real-time protection without delay</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRestart}
          className="border-2 border-green-500 rounded-xl px-12 py-4 bg-green-500/10 hover:bg-green-500/20 transition-colors"
        >
          <span className="text-green-300 font-semibold text-lg tracking-wider">
            RETURN TO DASHBOARD
          </span>
        </motion.button>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-8 text-green-300/40 text-sm tracking-wide text-center"
        >
          Biometric Shield v2.1 • Your privacy is secured
        </motion.div>
      </div>
    </div>
  );
}
