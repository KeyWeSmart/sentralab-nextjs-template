# SentraLab Next.js 템플릿

SentraLab 개발자가 익숙한 도구와 공통 UI 구성으로 새 프로젝트를 시작하기 위한 템플릿입니다. 개발 환경과 재사용 가능한 구현 기법을 제공하되, 기존 제품의 기능이나 업무 규칙을 새 프로젝트의 기본값으로 가져오지 않습니다.

**Next.js App Router · React · TypeScript · Tailwind CSS · Base UI/shadcn**

[빠른 시작](#빠른-시작) · [기본 구성](#기본-구성) · [개발 명령](#개발-명령) · [새 프로젝트 적용](#새-프로젝트에-적용하기) · [에이전트 안내](#에이전트와-함께-개발하기)

## 빠른 시작

개발 기준 환경은 **Node.js 24.x**와 **pnpm 10.34.1**입니다. pnpm 버전은 `package.json`의 `packageManager`에 지정되어 있습니다. 사용 중인 Node 도구 체계나 사용 가능한 Corepack으로 해당 버전을 준비합니다.

템플릿을 복제하거나 새 프로젝트에 복사한 뒤, 프로젝트 루트에서 실행합니다.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

<http://localhost:3000>에 접속하면 `/ko`로 이동합니다. 첫 화면은 `app/[lang]/page.tsx`에서 수정합니다.

- `/`는 쿼리 파라미터를 보존하는 **307 리다이렉트**로 `/ko`에 연결됩니다.
- 현재 지원 언어는 한국어뿐입니다. 지원하지 않는 언어와 없는 경로는 404를 반환합니다.
- 기본 실행에는 백엔드, `.env`, API 키나 외부 서비스 계정이 필요하지 않습니다.
- 로컬 Git 훅을 사용하려면 Git 저장소가 필요하지만, 원격 저장소 연결은 필요하지 않습니다.

> [!IMPORTANT]
> 의존성 설치에는 패키지 레지스트리 접근이 필요하며, `only-allow` 설치 가드는 pnpm 이외의 패키지 매니저 사용을 차단합니다. Geist 글꼴을 내려받는 빌드 과정에는 Google Fonts 접근도 필요합니다.

## 기본 구성

템플릿은 다음 세 가지를 구분합니다.

- **실행 가능한 기본 구성:** 개발 도구, Provider, 공통 UI primitive와 유틸리티.
- **필요할 때 적용하는 패턴:** 폼, 목록, 상세 조회, 변경 요청, 날짜, 업로드의 구현 예제.
- **프로젝트에서 결정할 사항:** API, 권한, 승인 절차, 검색 의미, 페이지네이션, 시간대, 입력 제한과 낙관적 처리 여부.

제품 화면, 인증·업무 API, 컴포넌트 갤러리, 테스트 프레임워크와 호스팅형 CI 설정은 포함하지 않습니다. 기존 Next.js 시작 화면은 `/ko`에 그대로 남아 있으며, 중립적인 색상과 스타일은 라이브러리 기본값이지 승인된 제품 디자인이 아닙니다.

### 화면과 다국어

`app/[lang]/layout.tsx`는 서버에서 언어를 검증하고 `localization/ko.json`을 읽어 다음 구성을 연결합니다.

- `next-themes`: 시스템 설정에 따른 라이트·다크 테마.
- `LocalizationProvider`: 경계별 Zustand 저장소에 서버에서 완성한 사전을 전달.
- `QueryProvider`: 클라이언트 서버 상태 관리.
- `TooltipProvider`와 Sonner: 공통 툴팁과 알림.

`useLocalization()`은 전체 상태를, `useLocalization((state) => state.localization.common.ui)`는 선택한 사전 영역을 제공합니다. 두 방식 모두 `lang`과 `localization`을 반환하며 별도의 클라이언트 로딩 화면을 요구하지 않습니다. 공통 UI의 닫기·로딩 문구는 한국어지만, 기존 시작 화면의 본문은 번역하거나 재설계하지 않았습니다.

### 공통 UI와 라이브러리

`components/ui/<name>`에서 필요한 컴포넌트를 직접 가져옵니다. 통합 barrel 파일은 없습니다.

- 입력·선택: `button`, `input`, `label`, `textarea`, `checkbox`, `switch`, `select`
- 오버레이: `dialog`, `sheet`, `tooltip`, `dropdown-menu`
- 표시·레이아웃: `separator`, `skeleton`, `spinner`, `badge`, `card`, `sonner`

`lib/utils.ts`는 클래스 병합용 `cn`을 제공합니다. React Hook Form, Zod와 resolver, date-fns, use-debounce, Zustand도 설치되어 있습니다. 실제 기능이 필요할 때 사용하며, 비어 있는 폼·서비스 추상화는 미리 만들지 않습니다. React Compiler가 활성화되어 있습니다.

### 서버 상태와 캐시

`providers/query.tsx`는 서버에서는 새로운 QueryClient를 만들고 브라우저에서는 하나를 재사용합니다. `constants/query-options.ts`는 **데이터의 신선도**와 **비활성 캐시 보관 기간**을 구분합니다.

| 정책 | 용도와 동작 |
| --- | --- |
| `defaultRetained` | 기본 정책. 1분 동안 신선하게 취급하고 비활성 캐시는 5분 보관합니다. |
| `freshRetained` | 즉시 오래된 데이터로 취급하되 비활성 캐시는 5분 보관합니다. 마운트·포커스 복귀·재연결 시 항상 다시 조회합니다. |
| `noCacheAuthoritative` | 같은 재조회 정책을 적용하되 비활성 캐시는 보관하지 않습니다. 보관을 금지해야 하는 경우에만 선택합니다. |

일반적인 소비자는 Provider의 기본값을 사용합니다. 브라우저 캐시는 서버·HTTP 캐시 정책이나 권한 검증을 대신하지 않으며, 캐시 보관 기간을 줄이는 것으로 누락된 무효화 처리를 해결하지 않습니다.

## 개발 명령

| 명령 | 설명 |
| --- | --- |
| `pnpm dev` | 타입 검사와 lint 후 개발 서버 및 Next.js inspector 실행 |
| `pnpm dev:secure` | 같은 검사를 거쳐 실험적 로컬 HTTPS로 실행 |
| `pnpm typecheck` | Next.js 경로 타입 생성 후 TypeScript 검사 |
| `pnpm lint` / `pnpm lint:fix` | 타입 검사 후 Biome lint 검사 / 안전한 수정 적용 |
| `pnpm pret` / `pnpm pret:fix` | 포맷 검사 / 포맷 적용 |
| `pnpm biome` | 타입·포맷·lint·import 정리 상태 통합 검사 |
| `pnpm biome:fix` | 타입 검사 후 Biome의 안전한 수정 적용 |
| `pnpm biome:summary` | Biome 진단 요약 |
| `pnpm build` | 프로덕션 빌드 |
| `pnpm start` | 빌드한 프로덕션 서버 실행 |

변경을 마무리할 때의 기본 확인 순서입니다.

```sh
pnpm biome
pnpm build
```

`typecheck`는 `next typegen`을 먼저 실행하므로, 새 환경에서도 경로 관련 타입을 생성한 뒤 검사합니다. VS Code에서는 Biome 확장을 사용합니다. 프로젝트 설정은 formatter 충돌을 피하도록 로컬 ESLint와 Prettier를 비활성화합니다.

### Git 훅

의존성 설치의 `prepare` 단계에서 Husky를 설정합니다. `pre-commit`과 `pre-merge-commit`은 모두 `pnpm biome`을 실행하며, 실패하면 작업을 막습니다. 검사 중 파일을 자동 수정하거나 stage하지 않습니다.

```sh
pnpm prepare
git config --get core.hooksPath # 기대값: .husky/_
```

훅 원본은 `.husky/`, 이식 가능한 pnpm 탐색 로직은 `huskyhooks/pnpm.sh`에 있습니다. 생성된 `.husky/_`는 공유하지 않습니다. 소스만 복사해 Git 저장소가 없다면 새 저장소를 초기화한 뒤 `pnpm prepare`를 실행합니다.

## 프로젝트 구조

```text
app/[lang]/       한국어 경로와 서버 루트 레이아웃
app/globals.css   공통 스타일과 테마 토큰
components/ui/    공통 UI primitive
constants/        Query 기본값과 정책
hooks/            다국어 접근 훅
providers/        다국어와 Query Provider
localization/     한국어 사전
lib/              클래스 병합 유틸리티
utils/            서버 전용 사전 로더
.agents/          공통 에이전트 정책과 프로젝트 Skill
vendor/           원본을 보존한 SentraLab 플러그인 복사본
.husky/           Git 훅 원본
huskyhooks/       훅에서 사용하는 pnpm 탐색 로직
```

## 새 프로젝트에 적용하기

> [!NOTE]
> 저장소 이름은 `sentralab-nextjs-template`이지만, 일부 실행 설정에는 원본 프로젝트의 Sentinel 식별자가 남아 있습니다. 폴더 이름 변경만으로 이 값들이 바뀌지는 않습니다.

1. `package.json`의 `name`인 `sentinel-frontend`를 새 프로젝트 이름으로 변경합니다. 필요한 lockfile 변경은 pnpm으로 처리합니다.
2. `localization/ko.json`의 `metadata.title`인 `Sentinel`을 변경합니다.
3. `app/[lang]/layout.tsx`의 테마 저장 키 `sentinel-theme`를 프로젝트에 맞게 정합니다.
4. `app/[lang]/page.tsx`, `app/favicon.ico`, `public/`의 시작 화면과 기본 자산을 실제 제품 요구사항에 맞게 교체합니다.
5. API, 권한, 입력 규칙, 검색·페이지네이션과 디자인은 새 프로젝트의 근거로 결정합니다. 다른 제품에 반복된 코드라는 이유만으로 그대로 채택하지 않습니다.

## 에이전트와 함께 개발하기

특정 에이전트나 클라이언트를 전제로 하지 않습니다. Skill의 등록·검색·호출은 사용하는 클라이언트의 지원 방식에 맞춥니다.

### 공통 정책과 구현 가이드

프런트엔드 작업 전에는 [공통 우선순위 정책](.agents/frontend-skill-precedence.md)을 읽습니다. 프로젝트 요구사항과 SentraLab의 동작·아키텍처 계약을 우선하고, Vercel 지침은 이를 보존하는 범위에서 성능 개선에 활용합니다.

프로젝트의 `sentralab-frontend-patterns` Skill은 이 정책을 먼저 읽도록 안내합니다. 다른 진입점에서는 클라이언트의 프로젝트 지침에 같은 파일을 참조하거나 작업 맥락에 포함합니다. `.agents/`에 파일이 있다는 사실만으로 모든 클라이언트가 자동으로 읽는다고 가정하지 않습니다.

- [프런트엔드 패턴 사용 안내](.agents/skills/sentralab-frontend-patterns/README.md): 요청 방법과 예제 적용 범위.
- [SentraLab UI/UX 사용 안내](vendor/sentralab-agent-plugin-registry/plugins/sentralab-web-frontend/skills/sentralab-react-ui-ux/README.md): 비동기 화면, 접근성, 초안 보호와 변경 요청의 안전성.
- [Lantern 사용 안내](vendor/sentralab-agent-plugin-registry/plugins/sentralab-common/skills/lantern/README.md): 사람이 명시적으로 요청할 때 시작하는 요구사항 인터뷰.

구현 예제의 에이전트용 상세 문서는 영어로 제공합니다. 필요한 주제만 선택해서 읽습니다.

[유틸리티 채택 기준](.agents/skills/sentralab-frontend-patterns/references/adoption.md) · [폼](.agents/skills/sentralab-frontend-patterns/references/forms.md) · [목록](.agents/skills/sentralab-frontend-patterns/references/lists.md) · [상세 조회](.agents/skills/sentralab-frontend-patterns/references/detail-reads.md) · [변경 요청](.agents/skills/sentralab-frontend-patterns/references/mutations.md) · [날짜·시간](.agents/skills/sentralab-frontend-patterns/references/date-time.md) · [파일 업로드](.agents/skills/sentralab-frontend-patterns/references/file-upload.md)

예제에는 실제 서비스와 다국어 문구를 연결해야 합니다. 예제가 있다는 이유로 기능, 가짜 API나 데모 페이지를 추가하지 않습니다. 예제 화면은 기본 앱에 포함되어 있지 않습니다.

### 출처와 업데이트

[SentraLab 플러그인 레지스트리](https://github.com/KeyWeSmart/sentralab-agent-plugin-registry)의 다음 플러그인을 `vendor/sentralab-agent-plugin-registry/plugins/`에 원본 그대로 보관합니다.

- `sentralab-common` **0.1.0**: Lantern.
- `sentralab-web-frontend` **0.1.0**: `sentralab-react-ui-ux`.
- 복사한 source revision: `a3f9e225034827080ff572c3b513b76d9ca28563`.

프로젝트가 직접 관리하는 `sentralab-frontend-patterns`와 공통 우선순위 정책은 파생 프로젝트에서 수정할 수 있습니다. Vercel Skill은 `.agents/skills/vercel-react-best-practices/`에 있으며, 출처와 콘텐츠 해시는 `skills-lock.json`이 기록합니다.

복사본은 자동 업데이트되지 않습니다. 레지스트리 변경을 검토한 뒤 플러그인 전체를 교체하고, 출처 revision과 실제 Skill 검색 결과를 함께 확인합니다. 새 플러그인이 프로젝트와 같은 이름의 Skill을 포함한다면 레지스트리 사본과 로컬 변형 중 하나만 활성화합니다.

<details>
<summary>Vercel Skill 설치 명령 참고</summary>

Vercel Skill의 프로젝트 로컬 설치 명령은 다음과 같습니다. 이미 포함된 사본을 사용한다면 다시 실행할 필요가 없습니다.

```sh
npx --yes skills add https://github.com/vercel-labs/agent-skills --skill vercel-react-best-practices --agent universal --yes
```

Skill·플러그인은 사용하는 클라이언트가 지원하는 방식으로 연결합니다. 설치하거나 연결하는 것만으로 Lantern 인터뷰가 시작되지는 않습니다.

</details>

### 문서 언어

직접 관리하는 **README와 개발자용 안내서는 한국어**, **에이전트 지침·`SKILL.md`·에이전트용 reference는 영어**로 작성합니다. 명령, API 이름과 경로는 원래 표기를 유지합니다. 외부에서 가져온 문서는 출처와 업데이트 가능성을 보존하기 위해 원문을 유지하고, 필요한 한국어 안내를 프로젝트 문서에 제공합니다.

## 자주 만나는 문제

- **개발 서버가 실행되기 전에 종료됩니다:** `pnpm dev`는 먼저 타입과 lint를 검사합니다. 앞서 출력된 진단을 해결한 뒤 다시 실행합니다.
- **경로 타입을 찾을 수 없습니다:** `tsc`만 직접 실행하기보다 `pnpm typecheck`로 Next.js 타입 생성부터 실행합니다.
- **설치나 빌드에서 다운로드가 실패합니다:** 패키지 레지스트리와 Google Fonts에 대한 네트워크·프록시 접근을 확인합니다.
- **GUI Git 클라이언트가 Node/pnpm을 찾지 못합니다:** 로컬 `~/.config/husky/init.sh`에서 기존 도구 체계를 초기화합니다. 개인 경로를 공용 훅에 넣지 않습니다.
- **에이전트가 Skill이나 정책을 찾지 못합니다:** 해당 클라이언트의 프로젝트 연결 설정과 실제 검색 결과를 확인하고, 필요한 문서를 명시적으로 전달합니다.
