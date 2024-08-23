import { ChevronDown, CloseIcon } from '@/components/Icons'
import { useState } from 'react'
import ChannelListMenuRow from './ChannelListMenuRow'
import { menuItems } from './menuItems'

const ChannelListTopBar = ({ serverName }: { serverName: string }) => {
	const [menuOpen, setMenuOpen] = useState(false)
	return (
		<div className='w-full relative'>
			<button
				className={`flex w-full items-center justify-between p-4 border-b-2 ${
					menuOpen ? 'bg-gray-300' : ''
				} border-gray-300 hover:bg-gray-300`}
				onClick={() => setMenuOpen(currentValue => !currentValue)}
			>
				<h2 className='text-lg font-bold text-gray-700'>{serverName}</h2>
				{menuOpen && <CloseIcon />}
				{!menuOpen && <ChevronDown />}
			</button>

			{menuOpen && (
				<div className=' absolute w-full p-2 z-10'>
					<div className='w-full bg-white p-2 shadow-lg rounded-md'>
						<h2>Меню</h2>
						{menuItems.map(option => {
							return (
								<button
									key={option.name}
									className='w-full'
									onClick={() => setMenuOpen(false)}
								>
									<ChannelListMenuRow {...option} />
								</button>
							)
						})}
					</div>
				</div>
			)}
		</div>
	)
}

export default ChannelListTopBar
