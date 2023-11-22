import {useCallback, useState} from "react";

/**
 * hook for open data in root
 * @return isOpen boolean
 * @return openDataHandler () => void
 */
export const useOpenData = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const openDataHandler = useCallback(() => setIsOpen(prev=>!prev),[])

    return {
        isOpen,
        openDataHandler
    }
}
