import { client } from "./../utils/client";

// 회원가입
const signup = async (data) => {
	const result = await client
		.post(`/users/signup`, data)
		.then((response) => response.data)
		.catch((error) => error.response);

	return result;
};

// 로그인
const login = async (data) => {
	const result = await client
		.post(`/users/login`, data)
		.then((response) => response)
		.catch((error) => error.response);
	return result;
};

// 로그아웃
const logout = async () => {
	const result = await client
		.get(`/users/logout`)
		.then((response) => response)
		.catch((error) => error.response);
	return result;
};

// 이메일 중복 검사
const emailDuplicateCheck = async (data) => {
	const result = await client
		.get(`/users/checkemail/${data}`)
		.then((response) => response.data)
		.catch((error) => error.response);
	return result;
};

// 닉네임 중복 검사
const nickNameDuplicateCheck = async (data) => {
	const result = await client
		.get(`/users/checkNickName/${data}`)
		.then((response) => response.data)
		.catch((error) => error.response);
	return result;
};

// 이메일 인증 메일 발송
const emailSendConfirm = async (data) => {
	const result = await client
		.post(`/users/checkEmail/${data}`)
		.then((response) => response.data)
		.catch((error) => error.response);
	return result;
};

// 이메일 인증
const emailConfirm = async (data) => {
	const result = await client
		.post(`/users/getcheckEmail`, data)
		.then((response) => response.data)
		.catch((error) => error.response);
	return result;
};

// 관심 카테고리 등록
const saveCategories = async (data) => {
	const result = await client
		.post(`/users/category`, data)
		.then((response) => response.data)
		.catch((error) => error.response);
	return result;
};

// 아이디 찾기
const findId = async (data) => {
	const result = await client
		.post(`/users/findEmail`, data)
		.then((response) => response)
		.catch((error) => error.response);
	return result;
};

// 비밀번호 찾기 (재설정 이메일 발송)
const findPw = async (data) => {
	const result = await client
		.post(`/users/findpw`, data)
		.then((response) => response.data)
		.catch((error) => error.response);
	return result;
};

export { login, logout, emailDuplicateCheck, nickNameDuplicateCheck, emailSendConfirm, emailConfirm, saveCategories, signup, findId, findPw };
