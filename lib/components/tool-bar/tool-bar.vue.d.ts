export interface Props {
    divider?: boolean;
    paddingSize?: string;
    clearPadding?: string[];
    toolMaxWidth?: string;
    border?: boolean;
}
declare const _default: import("vue").DefineComponent<{
    divider: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    paddingSize: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    clearPadding: {
        type: ArrayConstructor;
        required: false;
        default: () => never[];
    };
    toolMaxWidth: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    border: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
}, (_ctx: any, _cache: any) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    divider: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    paddingSize: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    clearPadding: {
        type: ArrayConstructor;
        required: false;
        default: () => never[];
    };
    toolMaxWidth: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    border: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
}>>, {
    divider: boolean;
    paddingSize: string;
    clearPadding: unknown[];
    toolMaxWidth: string;
    border: boolean;
}>;
export default _default;
