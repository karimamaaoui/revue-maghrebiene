import { useTranslation } from "react-i18next";
import '../../../../../i18n'

const Forms = () => {
	const { t } = useTranslation(["common", "profile"]);

	return (
		<div className="container mt-5 col-9 col-md-6">
			<h1 className="text-center">{t("common:profile")}</h1>

			<div className="form-group">
				<label htmlFor="">{t("profile:name")}:</label>
				<input
					type="text"
					className="form-control"
					placeholder="John Doe"
				/>
			</div>
			<div className="form-group">
				<label htmlFor="">{t("profile:age")}:</label>
				<input
					type="number"
					className="form-control"
					placeholder="25"
				/>
			</div>
			<div className="form-group">
				<label htmlFor="">{t("profile:email")}:</label>
				<input
					type="text"
					className="form-control"
					placeholder="john@john.com"
				/>
			</div>
			<br />
			<div className="text-center">
				<button className="btn btn-dark">{t("common:submit")}</button>
			</div>
		</div>
	);
};

export default Forms;

// import React from "react";
// import {useTranslation} from 'react-i18next'
//  import '../../../../../i18n'
// function Forms() {
//   const {t} = useTranslation()
//   return (
    
//     <>
//     <div class="alert alert-success" role="alert">
//         <h1 class="display-3">{t('home')}</h1>
//     </div>
//     <div class="alert alert-success" role="alert">
//     <h1 class="display-6">{t('description')}</h1>
//   </div>
//     </>
//   );
// }

// export default Forms;
