/*
 * Copyright (c) 2026 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export interface Related {
    id: string;
    title: Resource;
    cover: Resource;
}
export const RELATED_LIST_DATA: Related[] = [
    { id: 'r01', title: { "id": 16777228, "type": 10003, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" }, cover: { "id": 16777236, "type": 20000, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" } },
    { id: 'r02', title: { "id": 16777229, "type": 10003, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" }, cover: { "id": 16777237, "type": 20000, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" } },
    { id: 'r03', title: { "id": 16777230, "type": 10003, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" }, cover: { "id": 16777238, "type": 20000, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" } }
];
