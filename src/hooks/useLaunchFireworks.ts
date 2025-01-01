import { useCallback, memo, useEffect } from 'react'
import { Color, Vector3 } from 'three'

const useLaunchFireworks = ({ setFireworks, textures }) => {
    const launchFirework = useCallback(async () => {
        const id = Date.now() + Math.random()
        const colors = [
            new Color(0xcfec0e), // Amarillo
            new Color(0xE04144), // Rojo
            new Color(0x41E04E), // Verde
            new Color(0x6dcadc) // Azul
        ]
        const randomColor = colors[Math.floor(Math.random() * colors.length)]
        const fireworkSize = Math.floor(Math.random() * (1.5 - 0.3)) + 0.3
        const fireworkRadius = Math.floor(Math.random() * (15 - 3)) + 3
        const fireworkTrailLength = Math.floor(Math.random() * (20 - 10)) + 10

        await setFireworks((prev) => [
            ...prev,
            {
            id,
            position: new Vector3(
                (Math.random() - 0.5) * 10,
                Math.floor(Math.random() * (70 - 60 + 1)) + 50,
                (Math.random() - 0.5) * 2
            ),
            texture: textures[3],
            shellTexture: textures[3],
            color: randomColor,
            fireworkSize: fireworkSize,
            fireworkRadius: fireworkRadius,
            fireworkTrailLength: fireworkTrailLength
            }
        ])
    },[textures, setFireworks])

    const startShow = useCallback(() => {
        setInterval(() => {
            const times = Math.floor(Math.random() * 4) + 1 
            for (let i = 0; i < times; i++) {
                const delay = Math.random() * 1000 
                setTimeout(() => {
                launchFirework()
                }, delay)
            }
        }, 1500)
    }, [])
    return { launchFirework, startShow }
}

export default useLaunchFireworks