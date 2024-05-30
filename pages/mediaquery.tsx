//メディアクエリのコンポーネント作ったけど未使用
import { useEffect, useState } from 'react';

type UseMediaQueryType = (width: number) => boolean

const useMediaQuery: UseMediaQueryType = (width) => {
    const [targetReached, setTargetReached] = useState(false)
  
    const updateTarget = () => {
      setTargetReached(window.innerWidth > width)
    }
  
    useEffect(() => {
      updateTarget()
      window.addEventListener('resize', updateTarget)
      return () => window.removeEventListener('resize', updateTarget)
    }, [])
  
    return targetReached
  }
  
  export default useMediaQuery