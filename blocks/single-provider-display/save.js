import { useBlockProps } from '@wordpress/block-editor';

export default function save() {

	const blockProps = useBlockProps.save({
		className: '___bc__singleProviderDisplay'
	})
	
	return (
		<div { ...blockProps }>
			{ 'Single Provider Display' }
		</div>
	);
}
