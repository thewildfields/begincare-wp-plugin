import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

export default function Edit() {

	const blockProps = useBlockProps({
		className: '___bc__singleProviderDisplay'
	})

	return (
		<div { ...blockProps }>
			{ __( 'Single provider display', 'begincare' ) }
		</div>
	);
}
