import { useTranslation } from "react-i18next";
import '../../../../../i18n'
const Home18 = () => {
	const { t } = useTranslation(["home"]);

	return (
		<div className="container mt-5">
			<h1 className="text-center">{t("home")}</h1>
		</div>
	);
};

export default Home18;
