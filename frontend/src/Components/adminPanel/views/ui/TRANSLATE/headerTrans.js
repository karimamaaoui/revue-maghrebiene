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
