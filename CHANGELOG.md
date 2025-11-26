# Changelog

## 1.0.0 (2025-11-26)


### ⚠ BREAKING CHANGES

* Upgrade to expo 54 and updated related dependencies
* Upgrade to expo 53 and update related dependencies
* Upgrade to expo 52 and update related dependencies
* Upgrade to expo 51 and updating dependencies

### Features

* [US-0033] Access Lessons ([1c6b65d](https://github.com/my-workflow-testing-org/educado-mobile/commit/1c6b65d023b95309b0e67b358e1bc71248bdeca0))
* Add mise config file ([#483](https://github.com/my-workflow-testing-org/educado-mobile/issues/483)) ([7b1a630](https://github.com/my-workflow-testing-org/educado-mobile/commit/7b1a630ad0348dab0e5395d29e8fd7e728eeaad3))
* **CourseScreen:** login notification now shows if 'loggedIn' item from asyncStorage is present. After showing the notification, the 'loggedIn' item is removed ([76eddf6](https://github.com/my-workflow-testing-org/educado-mobile/commit/76eddf6d4fb2c2baae559bc51c386985acc5ac9a))
* **EditProfile.test:** tests have been made ([76eddf6](https://github.com/my-workflow-testing-org/educado-mobile/commit/76eddf6d4fb2c2baae559bc51c386985acc5ac9a))
* **package.json:** added commitizen to repo ([c66129b](https://github.com/my-workflow-testing-org/educado-mobile/commit/c66129bcf5d178dbe97b04f3e2c235229ff7b478))


### Bug Fixes

* 404. Fix dependencies ([03c3b4b](https://github.com/my-workflow-testing-org/educado-mobile/commit/03c3b4bc06a5b81006d057d1d220891c016f9763))
* 404. Reformat using Prettier ([6c336db](https://github.com/my-workflow-testing-org/educado-mobile/commit/6c336dbc7b92474fd2262aa3b779088eb2603071))
* 404. Update IDE configuration ([7fa9242](https://github.com/my-workflow-testing-org/educado-mobile/commit/7fa92422ac040cff61830e88aafd5ebfc23ae437))
* 406. Add build job to GitHub workflow ([#407](https://github.com/my-workflow-testing-org/educado-mobile/issues/407)) ([1ce0f12](https://github.com/my-workflow-testing-org/educado-mobile/commit/1ce0f121920955ee9a832feec87b6dc50cb53d35))
* 410. Add localization support ([#412](https://github.com/my-workflow-testing-org/educado-mobile/issues/412)) ([b6b35ba](https://github.com/my-workflow-testing-org/educado-mobile/commit/b6b35baa10191ba07f99edc795607323e1483ac0))
* 419. ESLint: Restrict `useCallback`, `useMemo` and `any` ([#420](https://github.com/my-workflow-testing-org/educado-mobile/issues/420)) ([db040ea](https://github.com/my-workflow-testing-org/educado-mobile/commit/db040eadbbf55b114ce3bfa9e46e4f50549b6d48))
* 422. Improve ESLint/tsc report in GitHub workflow ([#423](https://github.com/my-workflow-testing-org/educado-mobile/issues/423)) ([314d0ea](https://github.com/my-workflow-testing-org/educado-mobile/commit/314d0ea019e79a18bb68b57132a215c675858c9f))
* 426. Add Node.js environment to .eslintrc.js ([763298a](https://github.com/my-workflow-testing-org/educado-mobile/commit/763298ab04c14557bef5b482109a0ea66d5e3758))
* 426. Reformat with Prettier ([2733f5b](https://github.com/my-workflow-testing-org/educado-mobile/commit/2733f5beb4f2ffe7c2a5ccf9f01abd87afbba1ba))
* 426. Upgrade to Nativewind 4, make font loading static ([b4a88e6](https://github.com/my-workflow-testing-org/educado-mobile/commit/b4a88e69bb731f2efacc2d4002b729923f3b7591))
* 429. Prevent CI workflow run on drafts ([04de5e8](https://github.com/my-workflow-testing-org/educado-mobile/commit/04de5e857010919f4dc59f3aff9f6870804d68dc))
* 430. Prepare app/index.tsx to redirect to Expo Router routes ([2f569c5](https://github.com/my-workflow-testing-org/educado-mobile/commit/2f569c5f969b1b815c9ad2e27933c2a0fe031101))
* 431. Inline i18n exports ([07f1f8c](https://github.com/my-workflow-testing-org/educado-mobile/commit/07f1f8cef2dbd074def99b1df2b4320957de76c1))
* 432. Fix EduScreen.tsx and related components ([#433](https://github.com/my-workflow-testing-org/educado-mobile/issues/433)) ([3e63b23](https://github.com/my-workflow-testing-org/educado-mobile/commit/3e63b23a01810114904cc1750129b8ca6a632ff2))
* 434, fix [#435](https://github.com/my-workflow-testing-org/educado-mobile/issues/435), fix [#438](https://github.com/my-workflow-testing-org/educado-mobile/issues/438). Update ESLint to v9, create eslint-plugin-educado, add top 15 file to CI report ([#440](https://github.com/my-workflow-testing-org/educado-mobile/issues/440)) ([091c92a](https://github.com/my-workflow-testing-org/educado-mobile/commit/091c92aff5c7f374b5c40dcfc1cbdb8ab3b2ca5d))
* 437. Enable passing Jest tests ([#455](https://github.com/my-workflow-testing-org/educado-mobile/issues/455)) ([21c6875](https://github.com/my-workflow-testing-org/educado-mobile/commit/21c68758612f11ba639ae79b752b174a0f4afabb))
* 450. Improve Courses view ([#456](https://github.com/my-workflow-testing-org/educado-mobile/issues/456)) ([2362785](https://github.com/my-workflow-testing-org/educado-mobile/commit/2362785e72ebcb7bf1f8c6abafdf52e993ca380c))
* 459. Fix ESLint configuration ([#460](https://github.com/my-workflow-testing-org/educado-mobile/issues/460)) ([fcffcba](https://github.com/my-workflow-testing-org/educado-mobile/commit/fcffcbab125106f887de8a956616def5bf44f91a))
* 468. Update PR template, add LDE issue template ([#469](https://github.com/my-workflow-testing-org/educado-mobile/issues/469)) ([ace531c](https://github.com/my-workflow-testing-org/educado-mobile/commit/ace531c7a343798c38056ecee53b0f6aa1e0c6d6))
* 470. Refactor API fetching, caching and typing ([#484](https://github.com/my-workflow-testing-org/educado-mobile/issues/484)) ([13cd071](https://github.com/my-workflow-testing-org/educado-mobile/commit/13cd0715d9d5d130fa27d3abbc0953b6e227c75a))
* 472. Fix pull request template, fix GitHub LDE Issue Report form ([#474](https://github.com/my-workflow-testing-org/educado-mobile/issues/474)) ([00549a5](https://github.com/my-workflow-testing-org/educado-mobile/commit/00549a566c73be7e33b4cee8e8ad8f4bc3fb57dc))
* 472. Try to link project with form issue ([#477](https://github.com/my-workflow-testing-org/educado-mobile/issues/477)) ([a1cc3d6](https://github.com/my-workflow-testing-org/educado-mobile/commit/a1cc3d6240fb0a3c379b244f5154d001f6cbc166))
* 478. Remove package.json and package-lock.json from CI build trigger ([#479](https://github.com/my-workflow-testing-org/educado-mobile/issues/479)) ([dcb1295](https://github.com/my-workflow-testing-org/educado-mobile/commit/dcb12958c254e5da10c138b57ba2c82106e20cea))
* 480. Add scripts for local GitHub CI workflow execution ([#481](https://github.com/my-workflow-testing-org/educado-mobile/issues/481)) ([a1b49d2](https://github.com/my-workflow-testing-org/educado-mobile/commit/a1b49d292adf3cee6f0102e6b6350589494865e8))
* 495: Match space between courses to figma ([#532](https://github.com/my-workflow-testing-org/educado-mobile/issues/532)) ([466bb3e](https://github.com/my-workflow-testing-org/educado-mobile/commit/466bb3ee6140dabe1c047c1b95e249f2f39f8f52))
* 496, fix [#498](https://github.com/my-workflow-testing-org/educado-mobile/issues/498), fix [#500](https://github.com/my-workflow-testing-org/educado-mobile/issues/500). Add issue automation, fix test script ([#497](https://github.com/my-workflow-testing-org/educado-mobile/issues/497)) ([cbb4664](https://github.com/my-workflow-testing-org/educado-mobile/commit/cbb4664f912e700cdbf788b8f29b3e024b5137e3))
* 502. Fix bug with `Set Assignees` CI step ([#503](https://github.com/my-workflow-testing-org/educado-mobile/issues/503)) ([9953d77](https://github.com/my-workflow-testing-org/educado-mobile/commit/9953d77a39501afa26b3e685de7c3edf01250976))
* 529. Modernize CourseOverviewScreen.tsx ([#530](https://github.com/my-workflow-testing-org/educado-mobile/issues/530)) ([74820a9](https://github.com/my-workflow-testing-org/educado-mobile/commit/74820a98c92c44906cef2f68815a8ac9cf20c31e))
* 547. Add Badge component and refactor ProfileStatsBox ([#541](https://github.com/my-workflow-testing-org/educado-mobile/issues/541)) ([fd64cd0](https://github.com/my-workflow-testing-org/educado-mobile/commit/fd64cd04558e3d5fd06aea050b802cb6f8f5251a))
* Add package-lock and remove redundant dependencies ([2837a0e](https://github.com/my-workflow-testing-org/educado-mobile/commit/2837a0e0a992f18e046b71e86df7a0847f570eb9))
* Changed folder structure for future expo router migration and changed Relative to Absolute paths ([e5800de](https://github.com/my-workflow-testing-org/educado-mobile/commit/e5800de51e4ab4a11bebd7dbe6b752319f4b0b31))
* **LogOutButton:** logout button restyled ([76eddf6](https://github.com/my-workflow-testing-org/educado-mobile/commit/76eddf6d4fb2c2baae559bc51c386985acc5ac9a))
* Placed fonts in app.tsx for expo 52 compatibility and changed Android SDK version to 35 ([3e410fc](https://github.com/my-workflow-testing-org/educado-mobile/commit/3e410fc75b220a06088e26d779f01c15cc22e829))
* **ProfileSettings->EditProfile:** ProfileSettings renamed to EditProfile ([76eddf6](https://github.com/my-workflow-testing-org/educado-mobile/commit/76eddf6d4fb2c2baae559bc51c386985acc5ac9a))
* Refactor Tooltip to Animated, add PropTypes and make currentIndex numeric ([a96e883](https://github.com/my-workflow-testing-org/educado-mobile/commit/a96e883d9aea539db91d5551fe1dfb527db2d7de))
* **RegisterForm:** delete specified 'points' field in userInfo ([76eddf6](https://github.com/my-workflow-testing-org/educado-mobile/commit/76eddf6d4fb2c2baae559bc51c386985acc5ac9a))
* removed and migrated from unmaintained/deprecated dependencies to react-native packages ([20db3f9](https://github.com/my-workflow-testing-org/educado-mobile/commit/20db3f9bf679c217f69c11dfe57890b052c87b8d))
* Removed rneui/base dependency and migrated to react-native packages and moved screens to app/ directory ([7777420](https://github.com/my-workflow-testing-org/educado-mobile/commit/77774209ebc7bc6243ac9216ebc99a49c79a1964))
* running with expo 52 ([5ff4e6e](https://github.com/my-workflow-testing-org/educado-mobile/commit/5ff4e6e789c6b3294c8dccfeec3663cbc1865f97))
* updated snapshots ([76eddf6](https://github.com/my-workflow-testing-org/educado-mobile/commit/76eddf6d4fb2c2baae559bc51c386985acc5ac9a))


### Miscellaneous Chores

* Upgrade to expo 51 and updating dependencies ([03c87ca](https://github.com/my-workflow-testing-org/educado-mobile/commit/03c87ca62393186678950d5805e9f54d09a8ca26))
* Upgrade to expo 52 and update related dependencies ([a94c2e3](https://github.com/my-workflow-testing-org/educado-mobile/commit/a94c2e3f45ca48ecbfd8fdebd3f36c3e083c4379))
* Upgrade to expo 53 and update related dependencies ([d5af0aa](https://github.com/my-workflow-testing-org/educado-mobile/commit/d5af0aa1c426813430d20f032e98d4a5370e2d94))
* Upgrade to expo 54 and updated related dependencies ([9eb29fc](https://github.com/my-workflow-testing-org/educado-mobile/commit/9eb29fc5e72a3b48838499cc8fb47c285ad3e1b3))
