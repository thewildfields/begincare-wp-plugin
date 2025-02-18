import { useBlockProps } from '@wordpress/block-editor';

export default function save() {

	const blockProps = useBlockProps.save({
		className: 'facilitySearch__results'
	})
	
	return (
		<div { ...blockProps }>
			{ 'Begincare - search results!' }
		</div>
	);
}
