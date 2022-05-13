// import { useEffect } from "react";
// import { Link } from "react-router-dom";

// import { useTranslation } from "react-i18next";
// import i18next from "i18next";
// import '../../../../../i18n'

// const HeaderTran = () => {
// 	const { i18n, t } = useTranslation(["common"]);

// 	useEffect(() => {
// 		if (localStorage.getItem("i18nextLng")?.length > 2) {
// 			i18next.changeLanguage("en");
// 		}
// 	}, []);

// 	const handleLanguageChange = (e) => {
// 		i18n.changeLanguage(e.target.value);
// 	};

// 	return (
// 		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
// 			<Link className="navbar-brand" to="/">
// 				{t("yousuckatcoding")}
// 			</Link>
// 			<button
// 				className="navbar-toggler"
// 				type="button"
// 				data-toggle="collapse"
// 				data-target="#navbarNav"
// 				aria-controls="navbarNav"
// 				aria-expanded="false"
// 				aria-label="Toggle navigation"
// 			>
// 				<span className="navbar-toggler-icon"></span>
// 			</button>
// 			<div className="collapse navbar-collapse" id="navbarNav">
// 				<ul className="navbar-nav ml-auto">
// 					<li className="nav-item">
// 						<select
// 							className="nav-link bg-dark border-0 ml-1 mr-2"
// 							value={localStorage.getItem("i18nextLng")}
// 							onChange={handleLanguageChange}
// 						>
// 							<option value="en">English</option>
// 							<option value="fr">Français</option>
// 							<option value="es">Español</option>
// 						</select>
// 					</li>
// 					<li className="nav-item ml-2">
// 						<Link className="nav-link" to="/profile">
// 							{t("profile")}
// 						</Link>
// 					</li>
// 				</ul>
// 			</div>
// 		</nav>
// 	);
// };

// export default HeaderTran;
import React, { useEffect } from "react";
import { useTranslation } from 'react-i18next'
import { Link } from "react-router-dom";
function HeaderTran() {
  const {t, i18n} = useTranslation()

  const onChangeLang = (e)=>{
    i18n.changeLanguage(e.target.value)
  }

  useEffect(()=>{
    for (let index = 0; index < document.getElementsByClassName('lang').length; index++) {
      const element = document.getElementsByClassName('lang')[index];
      if(element.value === i18n.language){
        element.setAttribute("selected", "true")
      }
    }
  }, [])
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div>
            <select class="form-select d-flex" style={{ width: "70px" }} onChange={onChangeLang}>
              <option  value="en" className="lang">
                EN
              </option>
              <option  value="fr" className="lang">FR</option>
              <option  value="ar" className="lang">AR</option>

            </select>
          </div>
      </div>
    </nav>
  );
}

export default HeaderTran;