import { useBlockProps } from '@wordpress/block-editor';

export default function save({attributes}) {

	const {targetPage, openResultsInNewPage, searchDisplay, categories} = attributes;

	const blockProps = useBlockProps.save({
		className: `___bc__providerSearch ${searchDisplay}`,
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
					{categories.map((category) => (
						<button className='searchGroup__option' value={category.id} key={category.id}>
							{category.name}
						</button>
					))}
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
