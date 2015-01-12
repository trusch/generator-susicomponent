/*
 * Copyright (c) 2015, webvariants GmbH, http://www.webvariants.de
 *
 * This file is released under the terms of the MIT license. You can find the
 * complete text in the attached LICENSE file or online at:
 *
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @author: Tino Rusch (tino.rusch@webvariants.de)
 */

#include "world/BaseComponent.h"

#if defined(_WIN32)
#define LIBRARY_API __declspec(dllexport)
#else
#define LIBRARY_API
#endif

extern "C" {
    std::shared_ptr<Susi::System::Component> LIBRARY_API createComponent(Susi::System::ComponentManager *mgr, Susi::Util::Any & config);
    std::string LIBRARY_API getName();
    std::vector<std::string> LIBRARY_API getDependencies();
}

namespace Susi {
    class <%=name%>Component : public System::BaseComponent {
    protected:
        Susi::Util::Any _config;
    public:
        <%=name%>Component( System::ComponentManager * mgr, Susi::Util::Any & config ) :
            System::BaseComponent{mgr}, _config{config} {}

        ~<%=name%>Component() {
            stop();
        }

        virtual void start() override;
        virtual void stop() override;

    };
}

std::shared_ptr<Susi::System::Component> LIBRARY_API createComponent(Susi::System::ComponentManager * mgr, Susi::Util::Any & config){
    return std::make_shared<Susi::<%=name%>Component>(mgr,config);
}
std::string LIBRARY_API getName(){
    return "<%=name%>";
}
std::vector<std::string> LIBRARY_API getDependencies(){
    return {};
}

