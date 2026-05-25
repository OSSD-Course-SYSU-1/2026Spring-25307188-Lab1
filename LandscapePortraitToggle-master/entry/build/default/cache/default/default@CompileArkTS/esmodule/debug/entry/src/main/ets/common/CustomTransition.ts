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
// animationCallback is the animation content to be executed,
// and timeout is the timeout interval for the transition to end.
export interface AnimateCallback {
    animation: ((isPush: boolean, isExit: boolean, transitionProxy: NavigationTransitionProxy) => void | undefined) | undefined;
    timeout: (number | undefined) | undefined;
}
// Use a map to store page transition animation callbacks.
const customTransitionMap: Map<string, AnimateCallback> = new Map();
export class CustomTransition {
    private constructor() {
    }
    ;
    // [Start get_transition_instance]
    static delegate = new CustomTransition();
    // Return the CustomTransition instance.
    static getInstance() {
        return CustomTransition.delegate;
    }
    // [End get_transition_instance]
    // [Start register_nav_param]
    // Register the transition animation callback of the current page.
    registerNavParam(name: string, animationCallback: (operation: boolean, isExit: boolean, transitionProxy: NavigationTransitionProxy) => void, timeout: number): void {
        // Overwrite if already exists.
        if (customTransitionMap.has(name)) {
            let param = customTransitionMap.get(name);
            if (param !== undefined) {
                param.animation = animationCallback;
                param.timeout = timeout;
                return;
            }
        }
        // Creating a Transition Animation callback when it dose not exist.
        let params: AnimateCallback = { timeout: timeout, animation: animationCallback };
        customTransitionMap.set(name, params);
    }
    // [End register_nav_param]
    // [Start unregister_nav_param]
    // Unregister the transition animation callback of the current page.
    unRegisterNavParam(name: string): void {
        customTransitionMap.delete(name);
    }
    // [End unregister_nav_param]
    // [Start get_animate_param]
    // Obtain the transition animation callback.
    getAnimateParam(name: string): AnimateCallback {
        let result: AnimateCallback = {
            animation: customTransitionMap.get(name)?.animation,
            timeout: customTransitionMap.get(name)?.timeout,
        };
        return result;
    }
}
