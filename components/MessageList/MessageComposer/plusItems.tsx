import { ListRowElement } from '@/components/ChannalList/TopBar/menuItems'
import { Apps, FolderPlus, Thread } from '@/components/Icons'

export const plusItems: ListRowElement[] = [
	{
		name: 'Upload a File',
		icon: <FolderPlus />,
		bottomBorder: false,
		reverseOrder: true,
	},
	{
		name: 'Create Thread',
		icon: <Thread />,
		bottomBorder: false,
		reverseOrder: true,
	},
	{ name: 'Use Apps', icon: <Apps />, bottomBorder: false, reverseOrder: true },
]
