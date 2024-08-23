import {
	Bell,
	FaceSmile,
	FolderPlus,
	Gear,
	LeaveServer,
	Pen,
	PersonAdd,
	PlusCircle,
	Shield,
	SpeakerMuted,
} from '@/components/Icons'

export type ListRowElement = {
	name: string
	icon: JSX.Element
	bottomBorder?: boolean
	purple?: boolean
	red?: boolean
	reverseOrder?: boolean
}

export const menuItems: ListRowElement[] = [
	{
		name: 'Добавить человека',
		icon: <PersonAdd />,
		bottomBorder: false,
		purple: true,
	},
	{ name: 'Настройки сервера', icon: <Gear />, bottomBorder: false },
	{ name: 'Создать канал', icon: <PlusCircle />, bottomBorder: false },
	{ name: 'Создать категорию', icon: <FolderPlus />, bottomBorder: false },
	{ name: 'Каталог приложений', icon: <FaceSmile />, bottomBorder: true },
	{ name: 'Настройки уведомлений', icon: <Bell />, bottomBorder: false },
	{ name: 'Приватные настройки', icon: <Shield />, bottomBorder: true },
	{ name: 'Редактировать сервер', icon: <Pen />, bottomBorder: false },
	{
		name: 'Скрыть отключенные каналы',
		icon: <SpeakerMuted />,
		bottomBorder: true,
	},
	{
		name: 'Покинуть сервер',
		icon: <LeaveServer />,
		bottomBorder: false,
		red: true,
	},
]
