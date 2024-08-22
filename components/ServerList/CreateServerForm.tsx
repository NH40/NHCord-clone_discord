import { TUserObject } from '@/models/UserObject'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import CloseIcon from '../Icons'

type TFormState = {
	serverName: string
	serverImage: string
	users: TUserObject[]
}

export default function CreateServerForm() {
	const params = useSearchParams()
	const showCreateServerForm = params.get('createServer')
	const dialogRef = useRef<HTMLDialogElement>(null)

	const initialState: TFormState = {
		serverName: '',
		serverImage: '',
		users: [],
	}
	const [formData, setFormData] = useState<TFormState>(initialState)

	useEffect(() => {
		if (showCreateServerForm && dialogRef.current) {
			dialogRef.current.showModal()
		} else {
			dialogRef.current?.close()
		}
	}, [showCreateServerForm])

	return (
		<dialog className='absolute z-10 space-y-2 rounded-xl' ref={dialogRef}>
			<div className='w-full flex items-center justify-between py-8 px-6'>
				<h2 className='text-3xl font-semibold text-gray-600'>
					Создать новый сервер
				</h2>
				<Link href='/'>
					<CloseIcon />
				</Link>
			</div>
			<form method='dealog' className='flex flex-col space-y-2 px-6'>
				<label htmlFor='serverName' className='labelTitle'>
					Название сервера
				</label>
				<div className='flex items-center bg-gray-100 rounded'>
					<span className='text-2xl p-2 text-gray-500'>#</span>
					<input
						type='text'
						id='serverName'
						name='serverName'
						value={formData.serverName}
						onChange={e =>
							setFormData({ ...formData, serverName: e.target.value })
						}
						required
					/>
				</div>
				<label htmlFor='serverImage' className='labelTitle'>
					Ссылка на Изображения
				</label>
				<div className='flex items-center bg-gray-100 rounded'>
					<span className='text-2xl p-2 text-gray-500'>#</span>
					<input
						type='text'
						id='serverImage'
						name='serverImage'
						value={formData.serverImage}
						onChange={e =>
							setFormData({ ...formData, serverImage: e.target.value })
						}
						required
					/>
				</div>
			</form>
		</dialog>
	)
}
