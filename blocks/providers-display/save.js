import { useBlockProps } from '@wordpress/block-editor';

export default function save() {

	const blockProps = useBlockProps.save({
		className: '___bc__providersDisplay'
	})
	
	return (
		<div { ...blockProps }>
			{ 'Providers Display' }
		</div>
	);
}
