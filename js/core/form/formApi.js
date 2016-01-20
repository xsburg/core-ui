/**
 * Developer: Stepan Burguchev
 * Date: 10/13/2014
 * Copyright: 2009-2016 Comindware®
 *       All Rights Reserved
 * Published under the MIT license
 */

/* global define, require */

define([
        './behaviors/BackboneFormBehavior',

        './fields/CommonField',

        './editors/base/BaseItemEditorView',
        './editors/base/BaseLayoutEditorView',
        './editors/base/BaseCollectionEditorView',
        './editors/base/BaseCompositeEditorView',

        './ExtendedForm',

        './editors/BooleanEditorView',
        './editors/NumberEditorView',
        './editors/TextAreaEditorView',
        './editors/TextEditorView',
        './editors/PasswordEditorView',
        './editors/ReferenceEditorView',
        './editors/MemberSelectEditorView',
        './editors/DropdownEditorView',
        './editors/MembersBubbleEditorView',
        './editors/DurationEditorView',
        './editors/RadioGroupEditorView',
        './editors/DateEditorView',
        './editors/TimeEditorView',
        './editors/DateTimeEditorView',
        './editors/MentionEditorView',
        './editors/MultiSelectEditorView',

        './editors/impl/common/members/services/factory',
        './editors/impl/common/members/collections/MembersCollection',
        './editors/impl/common/members/models/MemberModel',
        './editors/impl/reference/controllers/DemoReferenceEditorController',
        './editors/impl/reference/controllers/DataSourceReferenceEditorController',
        './editors/impl/reference/controllers/BaseReferenceEditorController',
        './editors/impl/reference/collections/DataSourceReferenceCollection',
        './editors/impl/reference/collections/BaseReferenceCollection',
        './editors/impl/reference/models/DefaultReferenceModel',
        './editors/impl/reference/models/SearchMoreModel',
        './editors/impl/reference/views/ReferenceListItemView',
        './editors/impl/reference/views/SearchMoreListItemView',
        './editors/impl/reference/views/LoadingView',
        './editors/impl/reference/views/ReferenceButtonView',
        './editors/impl/reference/views/ReferencePanelView',

        './validators/RequiredValidator',
        './validators/LengthValidator',
        './validators/LettersValidator',
        './validators/PasswordValidator',
        './validators/PhoneValidator'
    ],
	function (
        BackboneFormBehavior,
        CommonField,
        BaseItemEditorView,
        BaseLayoutEditorView,
        BaseCollectionEditorView,
        BaseCompositeEditorView,
        ExtendedForm,
        BooleanEditorView,
        NumberEditorView,
        TextAreaEditorView,
        TextEditorView,
        PasswordEditorView,
        ReferenceEditorView,
        MemberSelectEditorView,
        DropdownEditorView,
        MembersBubbleEditorView,
        DurationEditorView,
        RadioGroupEditorView,
        DateEditorView,
        TimeEditorView,
        DateTimeEditorView,
        MentionEditorView,
        MultiSelectEditorView,

        editorsImplCommonMembersFactory,
        editorsImplCommonMembersCollection,
        editorsImplCommonMemberModel,
        DemoReferenceEditorController,
        DataSourceReferenceEditorController,
        BaseReferenceEditorController,
        DataSourceReferenceCollection,
        BaseReferenceCollection,
        DefaultReferenceModel,
        SearchMoreModel,
        ReferenceListItemView,
        SearchMoreListItemView,
        LoadingView,
        ReferenceButtonView,
        ReferencePanelView
        ) {
		'use strict';

		return /** @lends module:core.form */ {
            ExtendedForm: ExtendedForm,
            /**
             * Объекты Marionette.Behaviour, упрощающие использования модуля форм.
             * @namespace
             * */
            behaviors: {
                BackboneFormBehavior: BackboneFormBehavior
            },
            /**
             * Расширенная версия Backbone.Form.Field, поддерживающая ошибки валидации и текстовые подсказки.
             * @namespace
             * */
            fields: {
                CommonField: CommonField
            },
            /**
             * Редакторы
             * @namespace
             * */
			editors: {
                impl: {
                    common: {
                        members: {
                            collections: {
                                MembersCollection: editorsImplCommonMembersCollection
                            },
                            models: {
                                MemberModel: editorsImplCommonMemberModel
                            },
                            factory: editorsImplCommonMembersFactory
                        }
                    }
                },
                /**
                 * Базовые классы для реализации редакторов.
                 * @namespace
                 * */
                base: {
                    BaseItemEditorView: BaseItemEditorView,
                    BaseLayoutEditorView: BaseLayoutEditorView,
                    BaseCollectionEditorView: BaseCollectionEditorView,
                    BaseCompositeEditorView: BaseCompositeEditorView
                },
                /**
                 * Объекты для использования и кастомизации редактора ReferenceEditorView.
                 * @namespace
                 * */
                reference: {
                    /**
                     * Базовая реализация дата-провайдеров для ReferenceEditorView.
                     * @namespace
                     * */
                    controllers: {
                        DemoReferenceEditorController: DemoReferenceEditorController,
                        BaseReferenceEditorController: BaseReferenceEditorController,
                        DataSourceReferenceEditorController: DataSourceReferenceEditorController
                    },
                    collections: {
                        BaseReferenceCollection: BaseReferenceCollection,
                        DataSourceReferenceCollection: DataSourceReferenceCollection
                    },
                    models: {
                        DefaultReferenceModel: DefaultReferenceModel,
                        SearchMoreModel: SearchMoreModel
                    },
                    views: {
                        ReferenceListItemView: ReferenceListItemView,
                        SearchMoreListItemView: SearchMoreListItemView,
                        LoadingView: LoadingView,
                        ReferenceButtonView: ReferenceButtonView,
                        ReferencePanelView: ReferencePanelView
                    }
                },
				BooleanEditor: BooleanEditorView,
				NumberEditor: NumberEditorView,
				TextAreaEditor: TextAreaEditorView,
				TextEditor: TextEditorView,
                PasswordEditor:PasswordEditorView,
                ReferenceEditor: ReferenceEditorView,
                MemberSelectEditor: MemberSelectEditorView,
                DropdownEditor: DropdownEditorView,
                MembersBubbleEditor: MembersBubbleEditorView,
                DurationEditor: DurationEditorView,
                RadioGroupEditor: RadioGroupEditorView,
                DateEditor: DateEditorView,
                TimeEditor: TimeEditorView,
                DateTimeEditor: DateTimeEditorView,
                MentionEditor: MentionEditorView,
                MultiSelectEditor: MultiSelectEditorView
			}
		};
	});