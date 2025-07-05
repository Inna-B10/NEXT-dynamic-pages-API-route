'use client'

import dynamic from 'next/dynamic'

const DynamicOnboarding = dynamic(() => import('./Onboarding'), {
	ssr: false
})

export default function OnboardingDynWrapper() {
	return <DynamicOnboarding />
}
