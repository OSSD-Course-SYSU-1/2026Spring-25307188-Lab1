import { AnimationProperties } from '../common/AnimationProperties';
import { RectInfoInPx } from '../utils/ComponentAttrUtils';
import { CustomTransition } from '../common/CustomTransition';
import { VideoNodeController } from '../common/VideoNodeController';
import { display, window } from '@kit.ArkUI';
import { WindowUtils } from '../utils/WindowUtils';
import Logger from '../common/Logger';

@Builder
export function LandscapePlayBuilder() {
  MyPageLandscape();
}

const TAG = 'MyPageLandscapeTag';

// [Start landscape_bind_controller]
@Component
export struct MyPageLandscape {
  // [StartExclude landscape_bind_controller]
  @StorageLink('videoBackgroundColor') videoBackgroundColor: Color = Color.Transparent;
  @StorageLink('statusBarHeight') statusBarHeight: number = 0;
  @StorageLink('navBarHeight') navBarHeight: number = 0;
  @State animationProperties: AnimationProperties = new AnimationProperties(this.getUIContext());
  // [EndExclude landscape_bind_controller]
  // Obtaining the VideoNodeController instance
  @State nodeController: VideoNodeController = VideoNodeController.getInstance();
  // Page display orientation, default is landscape.
  @State displayOrientation: window.Orientation = window.Orientation.LANDSCAPE;
  // [StartExclude landscape_bind_controller]
  private stack: NavPathStack | null = null;
  private pageId: string = '-1';
  private prePageDoFinishTransition: () => void = () => {
  };
  private nodeRectInfo: RectInfoInPx = new RectInfoInPx();

  aboutToAppear(): void {
    if (WindowUtils.isExpandedOrHalfFolded()) {
      this.displayOrientation = window.Orientation.PORTRAIT;
    } else {
      this.displayOrientation = window.Orientation.LANDSCAPE;
    }

    this.foldStatusChangeUI();
  }

  // [Start folded_status_change]
  // Handling UI adaptation for video playback with collapse and expand functionality
  foldStatusChangeUI() {
    try {
      let beforeFoldedStatus: display.FoldStatus = display.getFoldStatus();
      // Handling UI adaptation for video playback with collapse and expand functionality
      let callback: Callback<display.FoldStatus> = (data: display.FoldStatus) => {
        // Full-screen playback: Expanded / Semi-expanded -> Collapsed detail page playback
        if ((beforeFoldedStatus === display.FoldStatus.FOLD_STATUS_EXPANDED ||
          beforeFoldedStatus === display.FoldStatus.FOLD_STATUS_HALF_FOLDED) &&
          data === display.FoldStatus.FOLD_STATUS_FOLDED) {
          CustomTransition.getInstance().unRegisterNavParam(this.pageId);
          this.stack?.pop(false);
          this.prePageDoFinishTransition();
        }
        // Full-screen playback: collapsed state -> expanded state full playback
        if (beforeFoldedStatus === display.FoldStatus.FOLD_STATUS_HALF_FOLDED &&
          data === display.FoldStatus.FOLD_STATUS_EXPANDED) {
          this.displayOrientation = window.Orientation.PORTRAIT;
        }
        beforeFoldedStatus = data;
      };
      display.on('foldStatusChange', callback);
    } catch (err) {
      let error = err as BusinessError;
      Logger.error(TAG, `on foldStatusChangeUI err, code: ${error.code}, message: ${error.message}`);
    }
  }
  // [End folded_status_change]

  aboutToDisappear(): void {
    try {
      display.off('foldStatusChange');
    } catch (err) {
      let error = err as BusinessError;
      Logger.error(TAG, `off foldStatusChange err, code: ${error.code}, message: ${error.message}`);
    }
  }
  // [EndExclude landscape_bind_controller]
  // [Start bind_transition_animation]
  build() {
    // [StartExclude bind_transition_animation]
    NavDestination() {
      Stack() {
        // Bind the NodeController to the NodeContainer
        NodeContainer(this.nodeController)
        // [StartExclude landscape_bind_controller]
        Stack() {
          Button({ type: ButtonType.Circle }) {
            SymbolGlyph($r('sys.symbol.chevron_backward'))
              .fontColor([$r('sys.color.icon_on_primary')])
              .fontSize($r('sys.float.Title_M'))
          }
          .height(40)
          .aspectRatio(1)
          .backgroundColor('#19FFFFFF')
          .margin({
            left: 16,
            top: 8
          })
          .alignRules({
            top: { anchor: '__container__', align: VerticalAlign.Top },
            left: { anchor: '__container__', align: HorizontalAlign.Start }
          })
          .onClick(() => {
            this.stack?.pop();
          })
        }
        .alignContent(Alignment.TopStart)
        .width('100%')
        .height('100%')
        // [EndExclude landscape_bind_controller]
      }
      // [StartExclude landscape_bind_controller]
      .alignContent(Alignment.Center)
      .width(this.animationProperties.width)
      .height(this.animationProperties.height)
      .translate({ x: this.animationProperties.translateX, y: this.animationProperties.translateY })
      .rotate({ angle: this.animationProperties.rotate })
      // [EndExclude landscape_bind_controller]
    }
    // Set the page display orientation.
    .preferredOrientation(this.displayOrientation)
    // [StartExclude landscape_bind_controller]
    .enableStatusBar(WindowUtils.isExpandedOrHalfFolded())
    .enableNavigationIndicator(WindowUtils.isExpandedOrHalfFolded())
    .width('100%')
    .height('100%')
    .backgroundColor(this.videoBackgroundColor)
    .hideTitleBar(true)
    .hideToolBar(true)
    .onBackPressed(() => {
      return true;
    })
    .onDisAppear(() => {
      if (this.pageId !== '-1') {
        CustomTransition.getInstance().unRegisterNavParam(this.pageId);
      }
    })
    // [EndExclude bind_transition_animation]
    .onReady((ctx: NavDestinationContext) => {
      if (ctx.navDestinationId) {
        this.pageId = ctx.navDestinationId;
        this.stack = ctx.pathStack;
        let param = ctx.pathInfo.param as Record<string, object>
        this.nodeRectInfo = param.nodeRectInfo as RectInfoInPx;
        this.prePageDoFinishTransition = param.DoDefaultTransition as () => void;
        // [Start register_nav_param]
        // Register the animation callback of the current page.
        CustomTransition.getInstance().registerNavParam(this.pageId,
          (isPush: boolean, isExit: boolean, transitionProxy: NavigationTransitionProxy) => {
            if (WindowUtils.isExpandedOrHalfFolded()) {
              // Play animation, foldable screen in unfolded state
              this.animationProperties.doAnimationFoldable(this.nodeRectInfo, isPush, isExit, transitionProxy,
                this.prePageDoFinishTransition);
            } else {
              // Perform animation, non-foldable screen expanded state
              this.animationProperties.doAnimation(this.nodeRectInfo, isPush, isExit, transitionProxy,
                this.prePageDoFinishTransition);
            }
          }, 2000);
        // [End register_nav_param]
      }
    // [EndExclude landscape_bind_controller]
    })
  }
  // [End bind_transition_animation]
}
// [End landscape_bind_controller]