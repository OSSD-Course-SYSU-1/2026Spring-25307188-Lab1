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
export interface Comment {
    id: string;
    avatar: Resource;
    username: string;
    content: Resource;
    sendTime: string;
}
export const COMMENT_LIST_DATA: Comment[] = [
    {
        id: 'c001',
        avatar: { "id": 16777248, "type": 20000, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" },
        username: 'm******',
        content: { "id": 16777221, "type": 10003, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" },
        sendTime: '07-27'
    },
    {
        id: 'c002',
        avatar: { "id": 16777249, "type": 20000, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" },
        username: 'H******',
        content: { "id": 16777222, "type": 10003, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" },
        sendTime: '07-27'
    },
    {
        id: 'c003',
        avatar: { "id": 16777250, "type": 20000, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" },
        username: 'K******',
        content: { "id": 16777223, "type": 10003, params: [], "bundleName": "com.example.landscapeportraittoggle", "moduleName": "entry" },
        sendTime: '07-27'
    }
];
