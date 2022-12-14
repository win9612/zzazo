import React, { useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import { BaseFlexWrapper, ButtonWrapper, PlanPageWrapper, Wrapper } from "../../components/styled/Wrapper";
import styled, { keyframes } from "styled-components";
import Radius from "../../components/plan/radius_bar/Radius";
import { useSelector } from "react-redux";
import PlanHeader from "../../components/plan/cards/PlanHeader";
import PlanList from "../../components/plan/cards/PlanList";
import moment from "moment";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { SliderWrapper } from "../../components/styled/SliderWrapper";
import RecommendHeader from "../../components/plan/cards/RecommendHeader";
import { ListTypes } from "./../../constants/ListTypes";
import { getPlaceList, getPlan, getPlanList, getRecommendList, savePlan } from "../../api/PlanAPI";
import MapContainer from "./../../components/kakaomap/MapContainer";
import Loading from "./../../components/common/Loading";
import CardDetail from "../../components/locationdetail/CardDetail";
import ListHeader from "../../components/plan/cards/ListHeader";
import { CATEGORIES } from "./../../constants/PlaceCategories";

const BeforeButton = styled(ButtonWrapper)`
	position: absolute;
	animation: motion 0.5s linear infinite alternate;
	top: 7rem;
	margin-top: 0px;
	width: 240px;
	background-color: #80e080;
	border: 1px solid #80c0a0;
	box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.25);

	@keyframes motion {
		0% {
			margin-top: 0px;
		}
		100% {
			margin-top: 0.2rem;
		}
	}

	@media screen and (max-width: 500px) {
		width: 60vw;
		left: 2rem;
		top: 11.5rem;
	}
`;

const AfterButton = styled(ButtonWrapper)`
	display: flex;
	position: absolute;
	bottom: 2rem;
	width: 40%;
	background-color: #80e080;
	border: 1px solid #80c0a0;
	color: white;
	font-weight: bold;
	font-size: 1.3rem;
	box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
	z-index: 1000;

	@media screen and (max-width: 500px) {
		position: relative;
		margin-top: 2rem;
		margin-bottom: 2rem;
		padding: 2rem;
		width: 200px;
	}
`;

const PageHeaderBlock = styled.div`
	display: flex;
	flex-direciton: column;
	align-items: start;
	width: 100%;
	height: 10vh;
	margin-top: 1rem;

	@media screen and (max-width: 500px) {
		height: 30vh;
		margin-bottom: 2vh;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
`;

const PlanBlock = styled.div`
	display: flex;
	flex-direciton: column;
	background-color: ${({ bg }) => bg};
	align-items: start;
	justify-content: ${({ justifyContent }) => justifyContent};
	width: 100%;
	height: 65vh;
	margin-top: ${({ marginTop }) => marginTop};
	margin-bottom: 2rem;

	@media screen and (max-width: 500px) {
		margin-top: 3rem;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		height: auto;
	}
`;

const Title = styled.h1`
	font-size: 3rem;
	font-weight: bold;
	color: #80c0a0;
	padding: 0 1rem 0.5rem 1rem;
	border-bottom: 3px solid #c0f0e0;
	min-width: 280px;

	@media screen and (max-width: 400px) {
		font-size: 2.5rem;
	}
	@media screen and (max-width: 350px) {
		font-size: 2rem;
		padding: 0 0.5rem 0.25rem 0.5rem;
	}
`;

const TrashCan = styled.div`
	display: flex;
	position: absolute;
	right: 0%;
	width: 6rem;

	&:after {
		content: "";
		display: block;
		padding-bottom: 100%;
	}
	.trash {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	@media screen and (max-width: 500px) {
		right: 1rem;
		top: 10.5rem;
		width: 5rem;
	}
`;

const MapWrapper = styled.div`
	display: flex;
	width: ${({ width }) => width};
	height: ${({ height }) => height};
	min-height: 320px;
	border: 1px solid black;

	@media screen and (max-width: 4096px) {
		height: calc(100% - 6rem);
	}
	@media screen and (max-width: 1024px) {
		height: calc(100% - 4rem);
	}
	@media screen and (max-width: 500px) {
		width: 100%;
		height: 25vh;
		margin-bottom: -15vh;
	}
`;

MapWrapper.defaultProps = {
	width: "70%",
	height: "100%",
	boxShadow: "2px 0 4px 0 #303030",
};

const PlanMakeWrapper = styled.div`
	// background-color: aqua;
	display: flex;
	flex-direction: column;
	width: ${({ width }) => width};
	height: 100%;
	min-height: 200px;
	user-select: none;
	overflow-x: hidden;
	overflow-y: hidden;

	@media screen and (max-width: 500px) {
		width: 100%;
		margin-top: 1rem;
	}
`;

const RadiusWrapper = styled.div`
	backgroud-color: green;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 6rem;

	@media screen and (max-width: 1024px) {
		height: 4rem;
	}
	@media screen and (max-width: 500px) {
		height: 3rem;
	}
`;

const RadiusButton = styled.button`
	background-color: #80e080;
	width: 64px;
	height: 50%;
	margin-right: 2rem;
	border: 1px solid #80c0a0;
	border-radius: 8px;
	font-size: 1.1rem;
	font-weight: bold;

	@media screen and (max-width: 500px) {
		font-size: 1rem;
		height: 80%;
	}
`;

const SectionTitle = styled.div`
	display: flex;
	width: ${({ width }) => width};
	height: 3rem;
	line-height: 3rem;
	border: none;
	border-radius: 8px;
	background-color: ${({ bg }) => bg};
	font-size: 1.5rem;
	font-weight: bold;
	text-align: center;
	align-items: center;
	justify-content: center;
	user-select: none;
	margin-bottom: 0.2rem;
	transition: 0.2s ease;

	@media screen and (max-width: 640px) {
		font-size: 1.2rem;
	}
	@media screen and (max-width: 500px) {
		font-size: 1.5rem;
	}
`;

SectionTitle.defaultProps = {
	width: "100%",
	bg: "#80e080",
};

const PlanCard = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	bottom: 0px;
	width: 100%;
	height: calc(100%);
	min-height: 480px;
	box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.25);

	@media screen and (max-width: 500px) {
		height: ${({ mWidth }) => mWidth};
		margin-bottom: 0.5rem;
	}
`;

const TrashWrapper = styled.div`
	background-color: yellow;
	display: ${({ display }) => display};
	position: absolute;
	right: 0px;
	top: 200px;
	width: 360px;
	height: ${({ height }) => height};
	overflow-y: hidden;
	overflow-x: hidden;
	z-index: 100;
	border-radius: 16px;
	background-color: rgba(38, 38, 38, 0.6);

	transition: 0.3s ease-in;

	@media screen and (max-width: 500px) {
		right: 8px;
		top: 228px;
		height: ${({ mHeight }) => mHeight};
		width: 80%;
	}
`;
TrashWrapper.defaultProps = {
	display: "flex",
};

const PlanMakeCard = () => {
	const ELEMENTS_PER_PAGE = 5;
	const LOADING_DEFAULT = "?????? ???????????? ???????????? ????????????...";
	const LOADING_SAVE = "?????? ?????? ??????????????????...";

	const location = useLocation(); // location.state.content, location.state.position
	const navigate = useNavigate();

	// States_??????
	const [loading, setLoading] = useState(false);
	const [loadingText, setLoadingText] = useState(LOADING_DEFAULT);
	const [start, setStart] = useState(100); // ?????? ???????????? ????????? ?????? state
	const [end, setEnd] = useState(5); // ?????? ???????????? ????????? ?????? state
	const [modalToggle, setModalToggle] = useState(false); // ?????? ???????????? ??????
	const [modalPlaceId, setModalPlaceId] = useState(0); // ?????? ???????????? ????????????
	const [mainLocation, setMainLocation] = useState({
		lat: 0.0,
		lng: 0.0,
	});
	const [mapLevel, setMapLevel] = useState(3); // ??? ??????
	const [radius, setRadius] = useState(100); // ??????

	// States_??????/?????? ?????????
	const [recommendListToggle, setRecommendListToggle] = useState(true); // [??????,??????] ?????? ??????
	const [recommendList, setRecommendList] = useState([]); // [??????]?????????
	const [placeList, setPlaceList] = useState([]); // [??????]?????????
	const [page, setPage] = useState(0); // [??????] ????????? number
	const [selectedCategories, setSelectedCategories] = useState([]); // [??????] ???????????? ?????????
	const [reloadAudio] = useState(new Audio(`${process.env.PUBLIC_URL}/assets/sounds/reload.mp3`));

	// States_???????????? ?????????
	const [planInfo, setPlanInfo] = useState({
		name: "",
		date: "",
		time: "00:00",
	});
	const [planList, setPlanList] = useState([]);

	// States_????????? ?????????
	const [trashList, setTrashList] = useState([]); // ????????? ?????????
	const [trashToggle, setTrashToggle] = useState(false); // ????????? ??????

	// useEffect_??? ?????? ????????? ???
	useEffect(async () => {
		// ?????? ?????? ????????? ??????
		window.scrollTo(0, 0);

		setLoading(true);
		// ???????????? ???????????? ?????? ?????? ??????
		setPlanList([
			{
				name: location.state.content.placename,
				address: location.state.content.addressname,
				latitude: location.state.position.lat,
				longitude: location.state.position.lng,
				isMain: true,
			},
		]);

		setMainLocation({
			lat: location.state.position.lat,
			lng: location.state.position.lng,
		});

		const recommendListResponse = await getRecommendList({
			radius: radius,
			longitude: parseFloat(location.state.position.lng),
			latitude: parseFloat(location.state.position.lat),
		});

		if (recommendListResponse.code === 200) {
			setRecommendList(recommendListResponse.data.Place);
		} else if (recommendListResponse.status !== 200) {
			alert("????????? ??????????????????.");
		}

		setLoading(false);
	}, []);

	// useEffect_??????/?????? ?????? ???
	useEffect(() => {
		onHandleRadius(recommendListToggle);
	}, [recommendListToggle]);

	// ?????? ???????????? ?????? ????????? ?????? ??????
	const onHandleRadius = async (isRecommend) => {
		setLoading(true);
		if (radius <= 200) {
			setMapLevel(3);
		} else if (radius <= 250) {
			setMapLevel(4);
		} else if (radius <= 600) {
			setMapLevel(5);
		} else {
			setMapLevel(6);
		}

		if (isRecommend) {
			const recommendListResponse = await getRecommendList({
				radius: radius,
				longitude: parseFloat(location.state.position.lng),
				latitude: parseFloat(location.state.position.lat),
			});

			if (recommendListResponse.code === 200) setRecommendList(recommendListResponse.data.Place);
			else if (recommendListResponse.status !== 200) alert("????????? ??????????????????");
		} else {
			const placeListResponse = await getPlaceList(selectedCategories, {
				radius: radius,
				longitude: parseFloat(location.state.position.lng),
				latitude: parseFloat(location.state.position.lat),
			});
			setPlaceList(placeListResponse);
		}
		setLoading(false);
	};

	// [???????????????, ???????????????] ?????? ?????? ??? ?????????
	const onHandleChangeList = (toggle) => {
		setRecommendListToggle(toggle);
		if (toggle) {
			setSelectedCategories([]);
			setPlaceList([]);
		} else {
			setRecommendList([]);
		}
	};

	// [??????]?????? ???????????? ?????? ??? ?????????
	const onHandleCategoryClick = async (categoryName) => {
		setLoading(true);
		let arr = Array.from(selectedCategories);
		let newarr = arr;
		if (arr.includes(categoryName)) {
			newarr = arr.filter((item) => item !== categoryName);
		} else {
			newarr.push(categoryName);
		}
		setSelectedCategories(newarr);

		const placeListResponse = await getPlaceList(newarr, {
			radius: radius,
			longitude: parseFloat(location.state.position.lng),
			latitude: parseFloat(location.state.position.lat),
		});
		setPlaceList(placeListResponse);
		setLoading(false);
	};

	// ?????? ???????????? ????????? ?????????
	const openModal = (placeId) => {
		window.scrollTo(0, 0);
		if (modalToggle) {
			document.body.style = `overflow: auto`;
		} else {
			document.body.style = `overflow: hidden`;
		}

		setModalPlaceId(placeId);
		setModalToggle(!modalToggle);
	};

	// ???????????? - ???????????? ?????? ?????????
	const onHandleName = (e) => {
		setPlanInfo({ ...planInfo, name: e.target.value });
	};

	// ???????????? - ???????????? ?????? ?????????
	const onHandleDate = (value) => {
		setPlanInfo({ ...planInfo, date: moment(value).format("YYYY-MM-DD") });
	};

	// ???????????? - ???????????? ?????? ?????????
	const onHandleTime = (e) => {
		setPlanInfo({ ...planInfo, time: e.target.value });
	};

	// ????????? ?????????
	const onHandleReload = () => {
		reloadAudio.volume = 0.3;
		reloadAudio.play();
		setPage(page + 1);
	};

	// +, - ?????? ?????? ??? ?????????
	const onHandleList = (listType, index) => {
		let arr1 = [];
		if (listType === ListTypes.RECOMMEND) {
			arr1 = Array.from(recommendList);
		} else if (listType === ListTypes.PLACE) {
			arr1 = Array.from(placeList);
		}
		let arr2 = Array.from(planList);
		let arr3 = Array.from(trashList);

		if (listType === ListTypes.RECOMMEND || listType === ListTypes.PLACE) {
			// [??????/??????] -> [??????]
			const arr1Index = listType === ListTypes.RECOMMEND ? (page * ELEMENTS_PER_PAGE + index) % recommendList.length : parseInt(index);

			// ?????? ?????? ??????
			let tmpStr = JSON.stringify(arr1[arr1Index]);
			let dupResult = arr2.filter((item) => {
				return tmpStr.includes(JSON.stringify(item));
			});
			if (dupResult.length > 0) {
				// ????????????
				alert("?????? ????????? ????????? ????????? ?????? ??? ????????????.");
				return;
			} else {
				// ????????? ?????????
				arr2.push(arr1[arr1Index]);
				arr1.splice(arr1Index, 1);
			}
		} else if (listType === ListTypes.PLAN) {
			// [??????] -> [?????????]
			arr3.push(arr2[index]);
			arr2.splice(index, 1);
		} else if (listType === ListTypes.TRASH) {
			// [?????????] -> [??????]
			arr2.push(arr3[index]);
			arr3.splice(index, 1);
		}

		// ??????
		if (listType === ListTypes.RECOMMEND) {
			setRecommendList(arr1);
		} else if (listType === ListTypes.PLACE) {
			setPlaceList(arr1);
		}
		setPlanList(arr2);
		setTrashList(arr3);
	};

	// ?????? ???????????? ?????? ??? ?????????
	const onHandleSavePlan = async () => {
		if (planInfo.name.length < 1) {
			alert("?????? ????????? ??????????????????.");
			return;
		} else if (planInfo.date.length < 1) {
			alert("?????? ????????? ??????????????????.");
			return;
		}

		// ????????? ????????? ??????
		setLoadingText(LOADING_SAVE);
		setLoading(true);
		let form = [];
		planList.map((item, index) => {
			form.push({
				title: planInfo.name,
				date: planInfo.date,
				appointed_time: planInfo.time,
				place_id: item._id ? item._id : null,
				address: item.address,
				isMain: item.isMain ? 1 : 0,
				latitude: item.latitude,
				longitude: item.longitude,
				place_type: item.place_type,
				name: item.name,
				priority: index + 1,
			});
		});

		const response = await savePlan(form);
		setLoading(false);
		setLoadingText(LOADING_DEFAULT);
		if (response.code !== 200) {
			alert("????????? ??????????????????.");
			return;
		}

		const r = await getPlan(response.data.cardId);

		alert("?????? ????????? ?????????????????????!");
		navigate(`/planshare/${response.data.cardId}`, {
			replace: true,
			state: {
				cardId: response.data.cardId,
				form: form,
			},
		});
	};

	return (
		<div align="center">
			<Header />
			{loading ? <Loading text={loadingText} /> : null}
			{modalToggle ? <CardDetail modalClose={openModal} placeId={modalPlaceId} /> : null}
			<SliderWrapper leftStart={start} leftEnd={end}>
				<PlanPageWrapper width="90vw">
					<BeforeButton
						onClick={() => {
							setStart(end);
							setEnd(100);
							setTimeout(() => navigate("/plan"), 400);
						}}
					>
						???????????? ?????? ????????????
					</BeforeButton>
					<PageHeaderBlock height="calc(20vh)">
						<Title>?????? ?????? ??????</Title>
						{/* ????????? */}
						<TrashCan onClick={() => setTrashToggle(!trashToggle)}>
							<img
								className="trash"
								src={!trashToggle ? `${process.env.PUBLIC_URL}/assets/plan/trash_close.png` : `${process.env.PUBLIC_URL}/assets/plan/trash_open.png`}
								alt="?????????"
								width="100%"
							/>
						</TrashCan>
						<TrashWrapper height={trashToggle ? "600px" : "0px"} mHeight={trashToggle ? "50%" : "0px"}>
							<PlanList pList={trashList} setPList={setTrashList} openModal={openModal} listType={ListTypes.TRASH} onHandleList={onHandleList} />
						</TrashWrapper>
					</PageHeaderBlock>
					<PlanBlock justifyContent="space-between">
						<PlanMakeWrapper width="calc(50% - 1rem)">
							{/* ?????? */}
							<RadiusWrapper>
								<Radius radius={radius} setRadius={setRadius} />
								<RadiusButton onClick={() => onHandleRadius(recommendListToggle)}>??????</RadiusButton>
							</RadiusWrapper>
							{/* ???????????? */}
							<MapWrapper mapName="make" width="99%" height="100%">
								<MapContainer
									lat={mainLocation.lat}
									lng={mainLocation.lng}
									mapLevel={mapLevel}
									placeList={recommendList.slice(
										(page * ELEMENTS_PER_PAGE) % recommendList.length,
										((page * ELEMENTS_PER_PAGE) % recommendList.length) + ELEMENTS_PER_PAGE
									)}
									planList={planList}
								/>
							</MapWrapper>
						</PlanMakeWrapper>
						{/* ?????? ??????, ?????? ?????? */}
						<PlanMakeWrapper width="calc(25% - 1rem)">
							<BaseFlexWrapper>
								<SectionTitle width="50%" bg={recommendListToggle ? "#80E080" : "#D9D9D9"} onClick={() => onHandleChangeList(true)}>
									??????
								</SectionTitle>
								<SectionTitle width="50%" bg={!recommendListToggle ? "#80E080" : "#D9D9D9"} onClick={() => onHandleChangeList(false)}>
									??????
								</SectionTitle>
							</BaseFlexWrapper>
							<PlanCard mWidth="50vh">
								{recommendListToggle ? (
									<RecommendHeader onHandleReload={onHandleReload} />
								) : (
									<ListHeader onHandleCategoryClick={onHandleCategoryClick} />
								)}
								{recommendListToggle ? (
									<PlanList
										pList={recommendList.slice(
											(page * ELEMENTS_PER_PAGE) % recommendList.length,
											((page * ELEMENTS_PER_PAGE) % recommendList.length) + ELEMENTS_PER_PAGE
										)}
										setPList={setRecommendList}
										openModal={openModal}
										onHandleList={onHandleList}
										listType={ListTypes.RECOMMEND}
									/>
								) : (
									<PlanList pList={placeList} setPList={setPlaceList} openModal={openModal} onHandleList={onHandleList} listType={ListTypes.PLACE} />
								)}
							</PlanCard>
						</PlanMakeWrapper>
						{/* ?????? ?????? */}
						<PlanMakeWrapper width="calc(25% - 1rem)">
							<SectionTitle width="100%">??? ??? ??? ???</SectionTitle>
							<PlanCard mWidth="50vh">
								<PlanHeader dateValue={planInfo.date} onHandleName={onHandleName} onHandleDate={onHandleDate} onHandleTime={onHandleTime} />
								<PlanList pList={planList} setPList={setPlanList} openModal={openModal} onHandleList={onHandleList} listType={ListTypes.PLAN} />
							</PlanCard>
						</PlanMakeWrapper>
					</PlanBlock>
					<AfterButton onClick={onHandleSavePlan}>?????? ????????????</AfterButton>
				</PlanPageWrapper>
			</SliderWrapper>
		</div>
	);
};

export default PlanMakeCard;
