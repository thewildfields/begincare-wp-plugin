import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import './editor.scss';
import { Panel, PanelBody, SelectControl, CheckboxControl, RadioControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { useEffect } from 'react';
import axios from 'axios';

export default function Edit({attributes, setAttributes}) {

	const [pages, setPages] = useState([]);

	const {searchDisplay, targetPage, openResultsInNewPage, categories} = attributes;

	useEffect(() => {

		const getCategories = async () => {
			try {
				const categoriesResponse = await axios("http://127.0.0.1:5001/begincare-webapp/us-central1/api/categories");

				const filteredCategories = categoriesResponse.data.categories.map((category) => {
					return {
						id: category._id,
						name: category.name
					}
				})

				filteredCategories.sort((a, b) => a.name.localeCompare(b.name))
				setAttributes({ categories: filteredCategories});
			} catch (error) {
				console.log(error)
			}
		}

		getCategories();
	}, []);

	const blockProps = useBlockProps({
		className: `___bc__providerSearch ${searchDisplay}`,
	})

	return (
		<>
			<InspectorControls>
				<Panel>
					<PanelBody
						title="Search Block Display"
					>
						<RadioControl
							label="Display"
							help="How search is displayed"
							options={ [
								{ label: 'Horizontal', value: '___bc__providerSearch_horizontal'},
								{ label: 'Vertical', value: '___bc__providerSearch_vertical' },
								{ label: 'Auto', value: '___bc__providerSearch_auto' },
							] }
							selected={searchDisplay}
							onChange={(val) => setAttributes({searchDisplay: val})}
						/>
					</PanelBody>
					<PanelBody
						title="Results Display"
					>
						<SelectControl
							label="test selector"
						/>
						<CheckboxControl
							label='Open in a new tab'
							help='Hint text'
							checked={openResultsInNewPage}
							onChange={val => setAttributes({openResultsInNewPage: val})}
							__nextHasNoMarginBottom={true}
						/>
					</PanelBody>
				</Panel>
			</InspectorControls>
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
			</div>
		</>
	);
}
