import { useBlockProps } from '@wordpress/block-editor';

export default function save({attributes}) {

	const {targetPage, openResultsInNewPage, searchDisplay} = attributes;

	const blockProps = useBlockProps.save({
		className: '___bc__providerSearch',
	})

	return (
		<div { ...blockProps }>
			<div className='searchGroup'>
				<div className='searchGroup__inputArea'>
					<input className='searchGroup__input' placeholder='Category'/>
					<div className='searchGroup__selectedValueContainer'>
						<span className='searchGroup__selectedValue'></span>
						<button className='searchGroup__selectedValueClose'>x</button>
					</div>
				</div>
				<div className='searchGroup__options'>
					<button className='searchGroup__option' value="6779181c7c8005a6b6aea771">Adult Day Care</button>
					<button className='searchGroup__option' value="6779182d7c8005a6b6aea773">Assisted Living Facility</button>
					<button className='searchGroup__option' value="677918357c8005a6b6aea775">Cardiologist</button>
					<button className='searchGroup__option' value="6779183b7c8005a6b6aea777">Dialysis Center</button>
					<button className='searchGroup__option' value="677918427c8005a6b6aea779">Endocrinologist</button>
					<button className='searchGroup__option' value="677918487c8005a6b6aea77b">Fitness / Silver Sneakers</button>
					<button className='searchGroup__option' value="6779184f7c8005a6b6aea77d">Gastroenterologist</button>
					<button className='searchGroup__option' value="677918557c8005a6b6aea77f">Geriatrician</button>
					<button className='searchGroup__option' value="6779185b7c8005a6b6aea781">Hematologist</button>
					<button className='searchGroup__option' value="677918657c8005a6b6aea783">Home Healthcare Services</button>
					<button className='searchGroup__option' value="6779186d7c8005a6b6aea785">Hospice Care</button>
					<button className='searchGroup__option' value="677918737c8005a6b6aea787">Hospital</button>
					<button className='searchGroup__option' value="6779187a7c8005a6b6aea789">Inpatient Rehab Facility</button>
					<button className='searchGroup__option' value="677918817c8005a6b6aea78b">Medical Equipment Supplier</button>
					<button className='searchGroup__option' value="6779188b7c8005a6b6aea78d">Memory Care</button>
					<button className='searchGroup__option' value="677918927c8005a6b6aea78f">Nephrologist</button>
					<button className='searchGroup__option' value="677918987c8005a6b6aea791">Nursing Home</button>
					<button className='searchGroup__option' value="6779189f7c8005a6b6aea793">Oncologist</button>
					<button className='searchGroup__option' value="677918a47c8005a6b6aea795">Ophthalmologist</button>
					<button className='searchGroup__option' value="677918ab7c8005a6b6aea797">Orthopedist</button>
					<button className='searchGroup__option' value="677918b17c8005a6b6aea799">Podiatrist</button>
					<button className='searchGroup__option' value="677918b97c8005a6b6aea79b">Rheumatologist</button>
					<button className='searchGroup__option' value="677918c07c8005a6b6aea79d">Skilled Nursing Facility</button>
					<button className='searchGroup__option' value="677918c77c8005a6b6aea79f">Surgery Center</button>
					<button className='searchGroup__option' value="677918cc7c8005a6b6aea7a1">Urologist</button>
					<button className='searchGroup__option' value="677918d37c8005a6b6aea7a3">Veterans Services</button>
					<button className='searchGroup__option' value="677919c81bc3d5d9d2815fc3">Adult Family Care Home</button>
					<button className='searchGroup__option' value="677919e71bc3d5d9d2815fc5">Continuing Care Retirement Community</button>
					<button className='searchGroup__option' value="677919fc1bc3d5d9d2815fc7">Healthcare Clinic</button>
					<button className='searchGroup__option' value="67791a201bc3d5d9d2815fc9">Palliative and Hospice Care</button>
					<button className='searchGroup__option' value="67791a2d1bc3d5d9d2815fcb">Senior Centers</button>
				</div>
			</div>
			<div className='searchGroup'>
				<div className='searchGroup__inputArea'>
					<input className='searchGroup__input searchGroup__input_autocomplete'/>
				</div>
			</div>
			<a href="" default-href={targetPage} className='searchButton' target={openResultsInNewPage ? '_blank' : ''}>Search</a>
		</div>
	);
}
