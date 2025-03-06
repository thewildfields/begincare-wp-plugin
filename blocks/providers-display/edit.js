import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import './editor.scss';
import { Panel } from '@wordpress/components';
import { PanelBody } from '@wordpress/components';
import { SelectControl } from '@wordpress/components';
import { ToggleControl } from '@wordpress/components';
import { RangeControl } from '@wordpress/components';

export default function Edit({attributes, setAttributes}) {

	const {content, resultsCount, showResultsHeader, showFilter, views} = attributes;

	const blockProps = useBlockProps({
		className: '___bc__providersDisplay'
	})

	const contentDisplayOptions = [
		{label: "Search results", value: "search-results"},
		{label: "Random providers", value: "random"},
		{label: "Last added", value: "last added"},
	]

	const viewsOptions = [
		{label: "Map Only", value: "map"},
		{label: "List Only", value: "list"},
		{label: "Map and List", value: "both"},
	]

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<Panel>
					<PanelBody
						title="Display Settings"
					>
						<SelectControl
							label="Providers to Display"
							help="Which providers are displayed"
							onChange={(val) => setAttributes({content: val})}
							value={content}
							options={contentDisplayOptions}
						/>
						<RangeControl
							label="Results Count"
							help="Number of providers to show"
							min={0}
							max={50}
							value={resultsCount}
							onChange={(val) => setAttributes({resultsCount: val})}
						/>
						{ content === 'search-results' && 
							<ToggleControl
								label="Show Results Header"
								help="Display Results Header"
								checked={showResultsHeader}
								onChange={() => setAttributes({showResultsHeader: !showResultsHeader})}
							/>
						}
						{ content === 'search-results' && 
							<ToggleControl
								label="Show Filter"
								help="Add filter for search results blocks"
								checked={showFilter}
								onChange={() => setAttributes({showFilter: !showFilter})}
							/>
						}
						<SelectControl
							label="Enabled Views"
							onChange={(val) => setAttributes({views: val})}
							value={views}
							options={viewsOptions}
						/>
					</PanelBody>
				</Panel>
			</InspectorControls>
			{ __( 'Providers Display', 'begincare' ) }
		</div>
	);
}
