import { createGlobalStyle } from 'styled-components';
import fonts from '../fonts';
import { narrowScroll } from '../mixins';

const PrimeReactStyle = createGlobalStyle`
// ------------------------------------------------------------------------------------//
// -----------------------------------DROPDOWM-----------------------------------------//
// ------------------------------------------------------------------------------------//
// .p-dropdown {
// border: 2px solid ${({ theme }) => theme.border};
// text-align: right !important;
// direction: rtl;
// width: 100%;
// border-radius: 5px;
// background-color: ${({ theme }) => theme.secondary};
// color: ${({ theme }) => theme.textColor};
// font-family: ${fonts.family.default};

// }

// .p-dropdown .p-dropdown-panel {
// border-top: none !important;

// }

// .p-dropdown-label.p-inputtext {
// padding: 8px;
// border: unset;
// font-family: ${fonts.family.default};
// background-color: ${({ theme }) => theme.primary};
// color: ${({ theme }) => theme.textColor};

// }

// .p-dropdown-trigger {
// background-color: ${({ theme }) => theme.primary};
// color: ${({ theme }) => theme.textColor};
// padding: 10px;
// }

// .p-dropdown-items-wrapper {
// text-align: right !important;
// background-color: ${({ theme }) => theme.primary};
// color: ${({ theme }) => theme.textColor};
// border-radius: 5px;
// ${narrowScroll};
// }

// .p-dropdown-item {
// padding: 5px 10px;

// &:hover {
// background-color: ${({ theme }) => theme.hover};
// }
// }

// .p-dropdown-filter {
// padding: 5px;
// margin:0.5rem 0;
// direction: rtl;
// font-family: ${fonts.family.default};
// background-color: ${({ theme }) => theme.primary};
// }

// .p-inputtext:focus,
// .p-dropdown .p-inputtext:focus,
// .p-autocomplete .p-inputtext:focus {
// outline: none;
// }

// .p-dropdown-filter-container {
// padding: 0.5em;
// border-bottom: 1px solid #c8c8c8;
// background-color: ${({ theme }) => theme.primary};
// }

// .p-dropdown-filter-container {
// border-bottom: none !important;
// display: flex;
// justify-content: center;
// }

// .p-dropdown-filter {
// width: 95%;

// border: 1px solid ${({ theme }) => theme.border};
// background-color: ${({ theme }) => theme.secondary};
// color: ${({ theme }) => theme.textColor};
// border-radius: 4px;
// margin: 0;
// }

// .p-dropdown-filter-icon {
// position: absolute;
// top: 50%;
// left: 30px;

// }

// .p-dropdown .p-dropdown-filter-container {
// direction: rtl; 
// }


// ------------------------------------------------------------------------------------//
// -----------------------------------MultiSelect-----------------------------------------//
// ------------------------------------------------------------------------------------//
.p-multiselect {
border: 2px solid ${({ theme }) => theme.border};
text-align: right !important;
direction: rtl;
width: 100%;
border-radius: 5px;
background-color: ${({ theme }) => theme.primary};
color: ${({ theme }) => theme.textColor};
font-family: ${fonts.family.default};
}

/* Label of the MultiSelect */
.p-multiselect-label {
padding: 7px;
background-color: ${({ theme }) => theme.primary};
color: ${({ theme }) => theme.textColor};
}

/* Dropdown icon */
.p-multiselect-trigger {
cursor: pointer;
background-color: ${({ theme }) => theme.primary};
color: ${({ theme }) => theme.textColor};
padding: 10px;
}

/* Panel of options */
.p-multiselect-panel {
border: 1px solid #c8c8c8;
box-shadow: 0px 3px 6px #00000029;
border-radius: 4px;
direction: rtl;
background-color: ${({ theme }) => theme.primary};
color: ${({ theme }) => theme.textColor};
}

/* Items list within the panel */
.p-multiselect-items {
list-style: none;
margin: 0;
padding: 0;
height: 200px;
overflow-y: auto;
${narrowScroll};
}

/* Individual item */
.p-multiselect-item {
padding: 0.5em;
cursor: pointer;
gap: 0.5rem;
justify-content: flex-start !important;
}

/* Item when hovered */
.p-multiselect-item:hover {
background-color: ${({ theme }) => theme.hover};
}

/* Filter input */
.p-multiselect-filter-container {
padding: 0.5em;
}

.p-multiselect-filter-container input {
width: 100%;
padding: 0.5em;
font-family: ${fonts.family.default};
background-color: ${({ theme }) => theme.secondary};
color: ${({ theme }) => theme.textColor} !important;
padding-left: 25px;
}

.p-multiselect-filter-icon {
margin-right: 0.5rem;
color: ${({ theme }) => theme.textColor} !important;
position: absolute;
top: 50%;
margin-top: -0.5rem;
left: 25px;
}

/* Header and Footer */
.p-multiselect-header,
.p-multiselect-footer {
padding: 0.5em;
direction: rtl;
}

/* Close icon in header */
.p-multiselect-close {
color: ${({ theme }) => theme.textColor};
// display:none !important;
}
.p-multiselect-header .p-checkbox-input{
width: 16px;
height: 16px;
}
.p-multiselect-header .p-checkbox-box{
display:none;}


.p-multiselect-items-wrapper .p-checkbox-input {
appearance: none;
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
padding: 0;
margin: 0;
opacity: 0;
z-index: 1;
outline: 0 none;
cursor: pointer;
}
// .p-multiselect-header .p-checkbox-input,
.p-multiselect-items-wrapper .p-checkbox .p-checkbox-box {   
background: #ffffff;
width: 16px;
height: 16px;
color: #3f3f46;
border-radius: 3px;
transition: none;
outline-color: transparent;
}

.p-checkbox .p-checkbox-box .p-checkbox-icon.p-icon {
width: 12px;
height: 12px;
display: flex;
margin: auto;
}

/* Checked state */
.p-checkbox.p-highlight .p-checkbox-box {
background-color: #007ad9;
border-color: #007ad9;
}

.p-checkbox.p-highlight .p-checkbox-box .p-checkbox-icon {
color: #ffffff;
}

/* Focus state */
.p-checkbox-box:focus {
box-shadow: 0 0 0 2px #007ad9;
}

// ------------------------------------------------------------------------------------//
// -----------------------------------Menu---------------------------------------------//
// ------------------------------------------------------------------------------------//
.p-menu  {
color: ${({ theme }) => theme.textColor} !important;
background-color: ${({ theme }) => theme.secondary} !important;
border:1px solid ${({ theme }) => theme.border};
border-radius:5px;
// min-width:20vw;
box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

}
.p-menu.project-management-part{
max-height:200px !important;;
overflow-y:auto !important;;
${narrowScroll};
}

// ------------------------------------------------------------------------------------//
// ---------------------------------InputNumber---------------------------------------------//
// ------------------------------------------------------------------------------------//

.p-inputnumber-input {
border-radius: 5px; 
width: 100% ;
color: ${({ theme }) => theme.textColor} !important;
font-family:${fonts.family.default};
 background-color: ${({ theme }) => theme.primary};
}

`;

export default PrimeReactStyle;
