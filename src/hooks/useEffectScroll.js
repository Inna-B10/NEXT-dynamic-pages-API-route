import { useCallback, useEffect, useRef } from 'react'

export function useEffectScroll(onIntersect, options = {}) {
	const observerRef = useRef()
	const lastElementRef = useRef()

	const observerCallback = useCallback(
		entries => {
			const [entry] = entries
			if (entry.isIntersecting) {
				onIntersect()
			}
		},
		[onIntersect]
	)

	useEffect(() => {
		if (!lastElementRef.current) return

		observerRef.current = new IntersectionObserver(observerCallback, {
			root: null,
			rootMargin: '0px',
			threshold: 1.0,
			...options
		})

		observerRef.current.observe(lastElementRef.current)

		return () => observerRef.current.disconnect()
	}, [observerCallback, options])

	return lastElementRef
}
