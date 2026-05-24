import React, { useEffect, useState } from 'react';

const ClickBurst = () => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const handleClick = (e) => {
            const x = e.clientX;
            const y = e.clientY;
            
            // Valkey colors
            const colors = ['#E0A2AF', '#642637', '#0A0D10', '#141A1F', '#1A2026', '#FFFDFA'];
            const newParticles = [];
            
            // Create 8 particles per click
            for (let i = 0; i < 8; i++) {
                const angle = Math.random() * Math.PI * 2;
                const distance = 50 + Math.random() * 50;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;
                
                newParticles.push({
                    id: Date.now() + i,
                    x,
                    y,
                    tx: `${tx}px`,
                    ty: `${ty}px`,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    size: 4 + Math.random() * 6
                });
            }
            
            setParticles(prev => [...prev, ...newParticles]);
            
            // Remove particles after animation ends (800ms)
            setTimeout(() => {
                setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
            }, 800);
        };

        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999 }}>
            {particles.map(p => (
                <div
                    key={p.id}
                    className="click-particle"
                    style={{
                        left: p.x - p.size / 2,
                        top: p.y - p.size / 2,
                        width: p.size,
                        height: p.size,
                        backgroundColor: p.color,
                        color: p.color, // For the box-shadow glow
                        '--tx': p.tx,
                        '--ty': p.ty
                    }}
                />
            ))}
        </div>
    );
};

export default ClickBurst;
