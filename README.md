Emails Editor для AngularJS
================================

Emails Editor это компонет для редактирования списка из адресатов одном поле. Компонент содержит в себе заголовок и поле ввода. В компоненте реализована односторонняя привязка данных (сверху вниз), поэтому при инициализации компонента ему на вход передается объект, описывающий его состояние (заголовок, список адресов). Сам компонент не изменяет своего состояния, а адресует наверх события при его изменении (добавление адреса, удаление адреса).

Установка
------------------------
Данный репозиторий является примером использования компонента в приложении Angular. Сам компонент находится в папке "component/emails-editor".

Добавьте ссылки на стили и скрипт компонента на свою страницу
    
    <link rel="stylesheet" href="components/emails-editor/css/emails-editor.css">
    <script src="components/emails-editor/js/emails-editor.js"></script>
    
Добавьте компонент при помощи тега:

    <emails-editor model="$ctrl.emailsEditor" on-create="$ctrl.emailsEditor.addValues(values)" on-delete="$ctrl.emailsEditor.removeValue(value)"></emails-editor>
    
Добавьте зависимость от модуля компонента в своё приложение и создайте объект, управляющий состоянием объекта:

    var app = angular.module('testApp', ['emailsEditor'])
    
    ctrl.emailsEditor = new EmailsEditor('Share \u201cBoard name\u201c with others');
    
Требования
-----------------------
Для работы компонента требуется версия AngularJS 1.5
